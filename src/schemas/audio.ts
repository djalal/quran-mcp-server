/**
 * Audio-related schemas for the Quran.com API MCP Server
 */

import { z } from 'zod';

/**
 * Schema for chapter-reciter-audio-file
 */
export const chapterReciterAudioFileSchema = z.object({
  id: z.string().describe("The Id of the reciter"),
  chapter_number: z.string().describe("The number of the chapter"),
});

/**
 * Schema for chapter-reciter-audio-files
 */
export const chapterReciterAudioFilesSchema = z.object({
  id: z.string().describe("The Id of the reciter"),
  language: z.string().optional().describe("Language"),
});

/**
 * Schema for recitations
 */
export const recitationsSchema = z.object({
  language: z.string().optional().describe("Name of reciters in specific language"),
});

/**
 * Schema for recitation-autio-files
 */
export const recitationAudioFilesSchema = z.object({
  recitation_id: z.string().describe("Recitation id"),
  fields: z.string().optional().describe("Comma separated field of audio files"),
  chapter_number: z.string().optional().describe("Chapter number"),
  juz_number: z.string().optional().describe("Juz number"),
  page_number: z.string().optional().describe("Page number"),
  hizb_number: z.string().optional().describe("Hizb number"),
  rub_el_hizb_number: z.string().optional().describe("Rub el Hizb number"),
  verse_key: z.string().optional().describe("Verse key"),
});

/**
 * Schema for chapter-reciters
 */
export const chapterRecitersSchema = z.object({
  language: z.string().optional().describe("Name of reciters in specific language"),
});

/**
 * Schema for recitation-info
 */
export const recitationInfoSchema = z.object({
  recitation_id: z.string().describe("Recitation id"),
});

/**
 * Schema for recitation-styles
 */
export const recitationStylesSchema = z.object({});

/**
 * Schema for list-surah-recitation
 */
export const listSurahRecitationSchema = z.object({
  recitation_id: z.string().describe("Recitation Id"),
  chapter_number: z.string().describe("Chapter number"),
});

/**
 * Schema for list-juz-recitaiton
 */
export const listJuzRecitationSchema = z.object({
  recitation_id: z.string().describe("Recitation Id"),
  juz_number: z.string().describe("Juz number"),
});

/**
 * Schema for list-page-recitaiton
 */
export const listPageRecitationSchema = z.object({
  recitation_id: z.string().describe("Recitation Id"),
  page_number: z.string().describe("Page number"),
});

/**
 * Schema for list-rub-el-hizb-recitaiton
 */
export const listRubElHizbRecitationSchema = z.object({
  recitation_id: z.string().describe("Recitation Id"),
  rub_el_hizb_number: z.string().describe("Rub el Hizb number"),
});

/**
 * Schema for list-hizb-recitaiton
 */
export const listHizbRecitationSchema = z.object({
  recitation_id: z.string().describe("Recitation Id"),
  hizb_number: z.string().describe("Hizb number"),
});

/**
 * Schema for list-ayah-recitaiton
 */
export const listAyahRecitationSchema = z.object({
  recitation_id: z.string().describe("Recitation Id"),
  ayah_key: z.string().describe("Ayah key"),
});

// Export all audio-related schemas
export default {
  chapterReciterAudioFile: chapterReciterAudioFileSchema,
  chapterReciterAudioFiles: chapterReciterAudioFilesSchema,
  recitations: recitationsSchema,
  recitationAudioFiles: recitationAudioFilesSchema,
  chapterReciters: chapterRecitersSchema,
  recitationInfo: recitationInfoSchema,
  recitationStyles: recitationStylesSchema,
  listSurahRecitation: listSurahRecitationSchema,
  listJuzRecitation: listJuzRecitationSchema,
  listPageRecitation: listPageRecitationSchema,
  listRubElHizbRecitation: listRubElHizbRecitationSchema,
  listHizbRecitation: listHizbRecitationSchema,
  listAyahRecitation: listAyahRecitationSchema,
};
