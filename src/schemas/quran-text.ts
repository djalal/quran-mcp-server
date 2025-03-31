/**
 * Quran text-related schemas for the Quran.com API MCP Server
 */

import { z } from 'zod';

/**
 * Common parameters for Quran text endpoints
 */
const commonQuranTextParams = {
  chapter_number: z.string().optional().describe("Chapter number"),
  juz_number: z.string().optional().describe("Juz number"),
  page_number: z.string().optional().describe("Page number"),
  hizb_number: z.string().optional().describe("Hizb number"),
  rub_el_hizb_number: z.string().optional().describe("Rub el Hizb number"),
  verse_key: z.string().optional().describe("Verse key"),
};

/**
 * Schema for QURAN-verses-indopak
 */
export const quranVersesIndopakSchema = z.object({
  ...commonQuranTextParams,
});

/**
 * Schema for QURAN-verses-uthmani-tajweed
 */
export const quranVersesUthmaniTajweedSchema = z.object({
  ...commonQuranTextParams,
});

/**
 * Schema for QURAN-verses-uthmani
 */
export const quranVersesUthmaniSchema = z.object({
  ...commonQuranTextParams,
});

/**
 * Schema for QURAN-verses-uthmani_simple
 */
export const quranVersesUthmaniSimpleSchema = z.object({
  ...commonQuranTextParams,
});

/**
 * Schema for QURAN-verses-Imlaei
 */
export const quranVersesImlaeiSchema = z.object({
  ...commonQuranTextParams,
});

/**
 * Schema for QURAN-verses-code_v1
 */
export const quranVersesCodeV1Schema = z.object({
  ...commonQuranTextParams,
});

/**
 * Schema for QURAN-verses-code_v2
 */
export const quranVersesCodeV2Schema = z.object({
  ...commonQuranTextParams,
});

// Export all Quran text-related schemas
export default {
  quranVersesIndopak: quranVersesIndopakSchema,
  quranVersesUthmaniTajweed: quranVersesUthmaniTajweedSchema,
  quranVersesUthmani: quranVersesUthmaniSchema,
  quranVersesUthmaniSimple: quranVersesUthmaniSimpleSchema,
  quranVersesImlaei: quranVersesImlaeiSchema,
  quranVersesCodeV1: quranVersesCodeV1Schema,
  quranVersesCodeV2: quranVersesCodeV2Schema,
};
