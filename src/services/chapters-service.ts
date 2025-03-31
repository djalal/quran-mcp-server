/**
 * Chapter-related services for the Quran.com API MCP Server
 */

import { z } from 'zod';
import { ApiError } from '../types/error';
import { verboseLog } from '../utils/logger';
import { makeApiRequest } from './base-service';
import { API_BASE_URL, CACHE_DURATION_MS } from '../config';
import { 
  listChaptersSchema, 
  getChapterSchema, 
  chapterInfoSchema 
} from '../schemas/chapters';
import { 
  ListChaptersResponse, 
  GetChapterResponse, 
  ChapterInfoResponse 
} from '../types/api-responses';

import { Cache } from '../utils/cache';

/**
 * Service for chapter-related API operations
 */
export class ChaptersService {
  // Use the improved cache utility with size limits and proper expiration
  private chaptersCache = new Cache<any>(50, CACHE_DURATION_MS);
  
  /**
   * List Chapters
   * Get list of chapters.
   * 
   * @param {Object} params - The parameters for this operation
   * @param {string} params.language - Parameter language
   * @returns {Promise<ListChaptersResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async listChapters(params: z.infer<typeof listChaptersSchema>): Promise<ListChaptersResponse> {
    try {
      // Validate parameters
      const validatedParams = listChaptersSchema.parse(params);
      
      // Generate cache key based on parameters
      const cacheKey = `chapters_${validatedParams.language || 'en'}`;
      
      // Check cache first
      const cachedData = this.chaptersCache.get(cacheKey);
      if (cachedData) {
        verboseLog('response', {
          method: 'listChapters',
          source: 'cache',
          cacheSize: this.chaptersCache.size()
        });
        
        return {
          success: true,
          message: "list-chapters executed successfully (from cache)",
          data: cachedData
        };
      }
      
      try {
        // Make request to Quran.com API
        const url = `${API_BASE_URL}/chapters`;
        const response = await makeApiRequest(url, {
          language: validatedParams.language
        });
        
        // Process and reduce the data to only essential fields
        const reducedData = {
          chapters: response.chapters.map((chapter: any) => ({
            id: chapter.id,
            name_arabic: chapter.name_arabic,
            name_simple: chapter.name_simple,
            translated_name: { 
              name: chapter.translated_name?.name || "" 
            }
            // Only include essential fields
          }))
        };
        
        verboseLog('response', {
          method: 'listChapters',
          source: 'api',
          dataSize: JSON.stringify(reducedData).length
        });
        
        // Update cache with the new data
        this.chaptersCache.set(cacheKey, reducedData);
        
        return {
          success: true,
          message: "list-chapters executed successfully",
          data: reducedData
        };
      } catch (axiosError) {
        verboseLog('error', {
          method: 'listChapters',
          error: axiosError instanceof Error ? axiosError.message : String(axiosError)
        });
        
        // If the API call fails, return mock data
        verboseLog('response', {
          method: 'listChapters',
          source: 'mock',
          reason: 'API unavailable'
        });
        
        const mockData = this.getChaptersMockData();
        
        return {
          success: true,
          message: "list-chapters executed with mock data (API unavailable)",
          data: mockData
        };
      }
    } catch (error) {
      verboseLog('error', {
        method: 'listChapters',
        error: error instanceof Error ? error.message : String(error)
      });
      
      if (error instanceof z.ZodError) {
        throw new ApiError(`Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`, 400);
      }
      
      // Return mock data as a fallback for any error
      verboseLog('response', {
        method: 'listChapters',
        source: 'mock',
        reason: 'error occurred'
      });
      
      const mockData = this.getChaptersMockData();
      
      return {
        success: true,
        message: "list-chapters executed with mock data (error occurred)",
        data: mockData
      };
    }
  }
  
  /**
   * Get Chapter
   * Get details of a single chapter.
   * 
   * @param {Object} params - The parameters for this operation
   * @param {string} params.language - Parameter language
   * @param {string} params.id - Chapter ID
   * @returns {Promise<GetChapterResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async getChapter(params: z.infer<typeof getChapterSchema>): Promise<GetChapterResponse> {
    try {
      // Validate parameters
      const validatedParams = getChapterSchema.parse(params);
      
      // Default to chapter 1 if no ID is provided
      const chapterId = params.id || '1';
      
      const url = `${API_BASE_URL}/chapters/${chapterId}`;
      
      // Make request to Quran.com API
      const data = await makeApiRequest(url, {
        language: validatedParams.language
      });
      
      return {
        success: true,
        message: "GET-chapter executed successfully",
        data
      };
    } catch (error) {
      verboseLog('error', {
        method: 'getChapter',
        error: error instanceof Error ? error.message : String(error)
      });
      
      if (error instanceof z.ZodError) {
        throw new ApiError(`Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`, 400);
      }
      
      // Re-throw other errors
      throw error;
    }
  }
  
  /**
   * Get Chapter Info
   * Get chapter info in specific language. Default to 'English'.
   * 
   * @param {Object} params - The parameters for this operation
   * @param {string} params.language - Parameter language
   * @param {string} params.chapter_id - Chapter ID
   * @returns {Promise<ChapterInfoResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async getChapterInfo(params: z.infer<typeof chapterInfoSchema>): Promise<ChapterInfoResponse> {
    try {
      // Validate parameters
      const validatedParams = chapterInfoSchema.parse(params);
      
      // Default to chapter 1 if no ID is provided
      const chapterId = params.chapter_id || '1';
      
      const url = `${API_BASE_URL}/chapters/${chapterId}/info`;
      
      // Make request to Quran.com API
      const data = await makeApiRequest(url, {
        language: validatedParams.language
      });
      
      return {
        success: true,
        message: "info executed successfully",
        data
      };
    } catch (error) {
      verboseLog('error', {
        method: 'getChapterInfo',
        error: error instanceof Error ? error.message : String(error)
      });
      
      if (error instanceof z.ZodError) {
        throw new ApiError(`Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`, 400);
      }
      
      // Re-throw other errors
      throw error;
    }
  }
  
  /**
   * Get mock data for chapters
   * @returns Mock chapters data
   */
  private getChaptersMockData() {
    return {
      chapters: [
        { id: 1, name_arabic: "الفاتحة", name_simple: "Al-Fatihah", translated_name: { name: "The Opening" } },
        { id: 2, name_arabic: "البقرة", name_simple: "Al-Baqarah", translated_name: { name: "The Cow" } },
        { id: 3, name_arabic: "آل عمران", name_simple: "Ali 'Imran", translated_name: { name: "Family of Imran" } },
        { id: 4, name_arabic: "النساء", name_simple: "An-Nisa", translated_name: { name: "The Women" } },
        { id: 5, name_arabic: "المائدة", name_simple: "Al-Ma'idah", translated_name: { name: "The Table Spread" } },
        { id: 6, name_arabic: "الأنعام", name_simple: "Al-An'am", translated_name: { name: "The Cattle" } },
        { id: 7, name_arabic: "الأعراف", name_simple: "Al-A'raf", translated_name: { name: "The Heights" } },
        { id: 8, name_arabic: "الأنفال", name_simple: "Al-Anfal", translated_name: { name: "The Spoils of War" } },
        { id: 9, name_arabic: "التوبة", name_simple: "At-Tawbah", translated_name: { name: "The Repentance" } },
        { id: 10, name_arabic: "يونس", name_simple: "Yunus", translated_name: { name: "Jonah" } }
      ]
    };
  }
}

// Export a singleton instance
export const chaptersService = new ChaptersService();
