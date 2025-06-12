import { z } from 'zod';

export const addBookmarkSchema = z.object({
  verse_key: z.string().min(1).describe("Verse key like '1:1'")
});

export const listBookmarksSchema = z.object({});

export const deleteBookmarkSchema = z.object({
  id: z.number().int().positive().optional(),
  verse_key: z.string().optional()
}).refine(data => data.id || data.verse_key, { message: 'id or verse_key required' });

export default {
  addBookmark: addBookmarkSchema,
  listBookmarks: listBookmarksSchema,
  deleteBookmark: deleteBookmarkSchema,
};
