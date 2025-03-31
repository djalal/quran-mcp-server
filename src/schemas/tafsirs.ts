/**
 * Tafsir-related schemas for the Quran.com API MCP Server
 */

import { z } from 'zod';

/**
 * Schema for tafsir
 */
export const tafsirSchema = z.object({
  tafsir_id: z.string().describe("Tafsir id"),
  fields: z.string().optional().describe("Comma separated fields of tafsir"),
  chapter_number: z.string().optional().describe("Chapter number"),
  juz_number: z.string().optional().describe("Juz number"),
  page_number: z.string().optional().describe("Page number"),
  hizb_number: z.string().optional().describe("Hizb number"),
  rub_el_hizb_number: z.string().optional().describe("Rub el Hizb number"),
  verse_key: z.string().optional().describe("Verse key"),
});

/**
 * Schema for tafsirs
 */
export const tafsirsSchema = z.object({
  language: z.string().optional().describe("Language"),
});

/**
 * Schema for tafsir-info
 */
export const tafsirInfoSchema = z.object({
  tafsir_id: z.string().describe("Tafsir id"),
});

// Export all tafsir-related schemas
export default {
  tafsir: tafsirSchema,
  tafsirs: tafsirsSchema,
  tafsirInfo: tafsirInfoSchema,
};
