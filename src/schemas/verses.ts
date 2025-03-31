/**
 * Verse-related schemas for the Quran.com API MCP Server
 */

import { z } from 'zod';

/**
 * Common parameters for verse-related endpoints
 */
const commonVerseParams = {
  language: z.string().optional().describe("Language to fetch word translation"),
  words: z.string().optional().describe("Include words of each ayah"),
  translations: z.string().optional().describe("Comma separated ids of translations"),
  audio: z.string().optional().describe("Id of recitation"),
  tafsirs: z.string().optional().describe("Comma separated ids of tafsirs"),
  word_fields: z.string().optional().describe("Comma separated list of word fields"),
  translation_fields: z.string().optional().describe("Comma separated list of translation fields"),
  fields: z.string().optional().describe("Comma separated list of ayah fields"),
};

const paginationParams = {
  page: z.string().optional().describe("For paginating within the result"),
  per_page: z.string().optional().describe("Records per api call"),
};

/**
 * Schema for verses-by_chapter_number
 */
export const versesByChapterNumberSchema = z.object({
  chapter_number: z.string().describe("Chapter number (1-114)"),
  ...commonVerseParams,
  ...paginationParams,
});

/**
 * Schema for verses-by_page_number
 */
export const versesByPageNumberSchema = z.object({
  page_number: z.string().describe("Madani Mushaf page number (1-604)"),
  ...commonVerseParams,
  ...paginationParams,
});

/**
 * Schema for verses-by_juz_number
 */
export const versesByJuzNumberSchema = z.object({
  juz_number: z.string().describe("Juz number (1-30)"),
  ...commonVerseParams,
  ...paginationParams,
});

/**
 * Schema for verses-by_hizb_number
 */
export const versesByHizbNumberSchema = z.object({
  hizb_number: z.string().describe("Hizb number (1-60)"),
  ...commonVerseParams,
  ...paginationParams,
});

/**
 * Schema for verses-by_rub_el_hizb_number
 */
export const versesByRubElHizbNumberSchema = z.object({
  rub_el_hizb_number: z.string().describe("Rub el Hizb number (1-240)"),
  ...commonVerseParams,
});

/**
 * Schema for verses-by_verse_key
 */
export const versesByVerseKeySchema = z.object({
  verse_key: z.string().describe("Verse key (chapter:verse)"),
  ...commonVerseParams,
});

/**
 * Schema for random_verse
 */
export const randomVerseSchema = z.object({
  ...commonVerseParams,
});

/**
 * Schema for verse-media
 */
export const verseMediaSchema = z.object({});

// Export all verse-related schemas
export default {
  versesByChapterNumber: versesByChapterNumberSchema,
  versesByPageNumber: versesByPageNumberSchema,
  versesByJuzNumber: versesByJuzNumberSchema,
  versesByHizbNumber: versesByHizbNumberSchema,
  versesByRubElHizbNumber: versesByRubElHizbNumberSchema,
  versesByVerseKey: versesByVerseKeySchema,
  randomVerse: randomVerseSchema,
  verseMedia: verseMediaSchema,
};
