/**
 * Search-related services for the Quran.com API MCP Server
 */

import { z } from 'zod';
import { ApiError } from '../types/error';
import { verboseLog } from '../utils/logger';
import { makeApiRequest } from './base-service';
import { API_BASE_URL } from '../config';
import { searchSchema } from '../schemas/search';
import { SearchResponse } from '../types/api-responses';

/**
 * Service for search-related API operations
 */
export class SearchService {
  /**
   * Search the Quran for specific terms
   * 
   * @param {Object} params - The parameters for this operation
   * @returns {Promise<SearchResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async search(params: z.infer<typeof searchSchema>): Promise<SearchResponse> {
    try {
      // Validate parameters
      const validatedParams = searchSchema.parse(params);
      
      const url = `${API_BASE_URL}/search`;
      
      // Make request to Quran.com API
      const data = await makeApiRequest(url, {
        q: validatedParams.q,
        size: validatedParams.size,
        page: validatedParams.page,
        language: validatedParams.language
      });
      
      return {
        success: true,
        message: "search executed successfully",
        data
      };
    } catch (error) {
      verboseLog('error', {
        method: 'search',
        error: error instanceof Error ? error.message : String(error)
      });
      
      if (error instanceof z.ZodError) {
        throw new ApiError(`Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`, 400);
      }
      
      // Re-throw other errors
      throw error;
    }
  }
}

// Export a singleton instance
export const searchService = new SearchService();
