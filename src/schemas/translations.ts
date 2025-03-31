/**
 * Translation-related schemas for the Quran.com API MCP Server
 */

import { z } from 'zod';

/**
 * Schema for translation
 */
export const translationSchema = z.object({
  translation_id: z.string().describe("Translation id"),
  fields: z.string().optional().describe("Comma separated fields of translation"),
  chapter_number: z.string().optional().describe("Chapter number"),
  juz_number: z.string().optional().describe("Juz number"),
  page_number: z.string().optional().describe("Page number"),
  hizb_number: z.string().optional().describe("Hizb number"),
  rub_el_hizb_number: z.string().optional().describe("Rub el Hizb number"),
  verse_key: z.string().optional().describe("Verse key"),
});

/**
 * Schema for translation-info
 */
export const translationInfoSchema = z.object({
  translation_id: z.string().describe("Translation id"),
});

/**
 * Schema for translations
 */
export const translationsSchema = z.object({
  language: z.string().optional().describe("Language"),
});

// Export all translation-related schemas
export default {
  translation: translationSchema,
  translationInfo: translationInfoSchema,
  translations: translationsSchema,
};
