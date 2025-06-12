/**
 * Bookmark handlers for the Quran.com API MCP Server
 */

import { z } from 'zod';
import { verboseLog } from '../utils/logger';
import { bookmarksService } from '../services';
import {
  addBookmarkSchema,
  listBookmarksSchema,
  deleteBookmarkSchema,
} from '../schemas/bookmarks';

export async function handleAddBookmark(args: any) {
  try {
    const validated = addBookmarkSchema.parse(args);
    const result = await bookmarksService.addBookmark(validated);
    verboseLog('response', { tool: 'add-user-bookmark', result });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  } catch (error) {
    verboseLog('error', { tool: 'add-user-bookmark', error: error instanceof Error ? error.message : String(error) });
    if (error instanceof z.ZodError) {
      return { content: [{ type: 'text', text: `Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}` }], isError: true };
    }
    return { content: [{ type: 'text', text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }], isError: true };
  }
}

export async function handleGetBookmarks(args: any) {
  try {
    const validated = listBookmarksSchema.parse(args);
    const result = await bookmarksService.getBookmarks(validated);
    verboseLog('response', { tool: 'list-user-bookmarks', result });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  } catch (error) {
    verboseLog('error', { tool: 'list-user-bookmarks', error: error instanceof Error ? error.message : String(error) });
    if (error instanceof z.ZodError) {
      return { content: [{ type: 'text', text: `Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}` }], isError: true };
    }
    return { content: [{ type: 'text', text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }], isError: true };
  }
}

export async function handleDeleteBookmark(args: any) {
  try {
    const validated = deleteBookmarkSchema.parse(args);
    const result = await bookmarksService.deleteBookmark(validated);
    verboseLog('response', { tool: 'delete-user-bookmark', result });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  } catch (error) {
    verboseLog('error', { tool: 'delete-user-bookmark', error: error instanceof Error ? error.message : String(error) });
    if (error instanceof z.ZodError) {
      return { content: [{ type: 'text', text: `Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}` }], isError: true };
    }
    return { content: [{ type: 'text', text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }], isError: true };
  }
}
