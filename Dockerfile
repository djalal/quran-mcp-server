# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files and npm configuration
COPY package*.json .npmrc ./

# Install all dependencies (including dev dependencies) with cache mount for faster builds
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set working directory and ownership
WORKDIR /app
RUN chown -R appuser:appgroup /app

# Copy built application from builder stage
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/package*.json ./

# Set security configurations
RUN apk add --no-cache dumb-init
USER appuser

# Use dumb-init as PID 1
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
