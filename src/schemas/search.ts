/**
 * Search-related schemas for the Quran.com API MCP Server
 */

import { z } from 'zod';

/**
 * Schema for search
 */
export const searchSchema = z.object({
  q: z.string().describe("Search query, you can use *query* as well"),
  size: z.string().optional().describe("Results per page. *s* is also valid parameter."),
  page: z.string().optional().describe("Page number, well for pagination. You can use *p* as well"),
  language: z.string().optional().describe("ISO code of language, use this query params if you want to boost translations for specific language."),
});

// Export all search-related schemas
export default {
  search: searchSchema,
};
