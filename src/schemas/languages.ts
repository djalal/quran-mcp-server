/**
 * Language-related schemas for the Quran.com API MCP Server
 */

import { z } from 'zod';

/**
 * Schema for languages
 */
export const languagesSchema = z.object({
  language: z.string().optional().describe("Language"),
});

// Export all language-related schemas
export default {
  languages: languagesSchema,
};
