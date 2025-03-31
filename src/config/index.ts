/**
 * Configuration and environment variables for the Quran.com API MCP Server
 */

// Environment variables
export const VERBOSE_MODE = process.env.VERBOSE_MODE === 'true';
export const API_KEY = process.env.API_KEY || '';

// API configuration
export const API_BASE_URL = 'https://api.quran.com/api/v4';

// Cache configuration
export const CACHE_DURATION_MS = 3600000; // 1 hour cache validity

// Request configuration
export const REQUEST_TIMEOUT_MS = 30000; // 30 second timeout
