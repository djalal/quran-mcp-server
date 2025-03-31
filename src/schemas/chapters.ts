/**
 * Chapter-related schemas for the Quran.com API MCP Server
 */

import { z } from 'zod';

/**
 * Schema for list-chapters
 */
export const listChaptersSchema = z.object({
  language: z.string()
    .trim()
    .min(2, "Language code must be at least 2 characters")
    .max(10, "Language code must not exceed 10 characters")
    .regex(/^[a-zA-Z-]+$/, "Language code must contain only letters and hyphens")
    .describe("Parameter language (e.g., 'en', 'ar', 'fr-CA')"),
});

/**
 * Schema for GET-chapter
 */
export const getChapterSchema = z.object({
  language: z.string()
    .trim()
    .min(2, "Language code must be at least 2 characters")
    .max(10, "Language code must not exceed 10 characters")
    .regex(/^[a-zA-Z-]+$/, "Language code must contain only letters and hyphens")
    .describe("Parameter language (e.g., 'en', 'ar', 'fr-CA')"),
  id: z.union([
    z.string()
      .trim()
      .regex(/^\d+$/, "Chapter ID must be a positive integer")
      .transform(Number),
    z.number()
      .int("Chapter ID must be an integer")
      .positive("Chapter ID must be positive")
  ])
    .optional()
    .describe("Chapter ID (1-114)"),
});

/**
 * Schema for info
 */
export const chapterInfoSchema = z.object({
  language: z.string()
    .trim()
    .min(2, "Language code must be at least 2 characters")
    .max(10, "Language code must not exceed 10 characters")
    .regex(/^[a-zA-Z-]+$/, "Language code must contain only letters and hyphens")
    .describe("Parameter language (e.g., 'en', 'ar', 'fr-CA')"),
  chapter_id: z.union([
    z.string()
      .trim()
      .regex(/^\d+$/, "Chapter ID must be a positive integer")
      .transform(Number),
    z.number()
      .int("Chapter ID must be an integer")
      .positive("Chapter ID must be positive")
  ])
    .optional()
    .describe("Chapter ID (1-114)"),
});

/**
 * Schema for chapter-info
 */
export const chapterInfoListSchema = z.object({});

// Export all chapter-related schemas
export default {
  listChapters: listChaptersSchema,
  getChapter: getChapterSchema,
  chapterInfo: chapterInfoSchema,
  chapterInfoList: chapterInfoListSchema,
};
