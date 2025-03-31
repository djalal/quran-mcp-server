/**
 * Juz-related schemas for the Quran.com API MCP Server
 */

import { z } from 'zod';

/**
 * Schema for juzs
 */
export const juzsSchema = z.object({});

// Export all juz-related schemas
export default {
  juzs: juzsSchema,
};
