/**
 * Bookmarks-related services for the Quran.com API MCP Server
 */

import { z } from 'zod';
import { ApiError } from '../types/error';
import { verboseLog } from '../utils/logger';
import { makeRequest } from './base-service';
import { API_BASE_URL } from '../config';
import {
  addBookmarkSchema,
  listBookmarksSchema,
  deleteBookmarkSchema,
} from '../schemas/bookmarks';
import {
  AddBookmarkResponse,
  GetBookmarksResponse,
  DeleteBookmarkResponse,
} from '../types/api-responses';

/** Service for user bookmark API operations */
export class BookmarksService {
  async addBookmark(params: z.infer<typeof addBookmarkSchema>): Promise<AddBookmarkResponse> {
    try {
      const validated = addBookmarkSchema.parse(params);
      const url = `${API_BASE_URL}/user/bookmarks`;
      const data = await makeRequest('POST', url, {}, validated);
      return {
        success: true,
        message: 'add-bookmark executed successfully',
        data,
      };
    } catch (error) {
      verboseLog('error', { method: 'addBookmark', error: error instanceof Error ? error.message : String(error) });
      if (error instanceof z.ZodError) {
        throw new ApiError(`Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`, 400);
      }
      throw error;
    }
  }

  async getBookmarks(params: z.infer<typeof listBookmarksSchema>): Promise<GetBookmarksResponse> {
    try {
      const validated = listBookmarksSchema.parse(params);
      const url = `${API_BASE_URL}/user/bookmarks`;
      const data = await makeRequest('GET', url, validated);
      return { success: true, message: 'list-bookmarks executed successfully', data };
    } catch (error) {
      verboseLog('error', { method: 'getBookmarks', error: error instanceof Error ? error.message : String(error) });
      if (error instanceof z.ZodError) {
        throw new ApiError(`Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`, 400);
      }
      throw error;
    }
  }

  async deleteBookmark(params: z.infer<typeof deleteBookmarkSchema>): Promise<DeleteBookmarkResponse> {
    try {
      const validated = deleteBookmarkSchema.parse(params);
      let url = `${API_BASE_URL}/user/bookmarks`;
      const query: any = {};
      if (validated.id) {
        url += `/${validated.id}`;
      } else if (validated.verse_key) {
        query.verse_key = validated.verse_key;
      }
      const data = await makeRequest('DELETE', url, query);
      return { success: true, message: 'delete-bookmark executed successfully', data };
    } catch (error) {
      verboseLog('error', { method: 'deleteBookmark', error: error instanceof Error ? error.message : String(error) });
      if (error instanceof z.ZodError) {
        throw new ApiError(`Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`, 400);
      }
      throw error;
    }
  }
}

export const bookmarksService = new BookmarksService();
