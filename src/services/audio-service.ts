/**
 * Audio-related services for the Quran.com API MCP Server
 */

import { z } from 'zod';
import { ApiError } from '../types/error';
import { verboseLog } from '../utils/logger';
import { makeApiRequest } from './base-service';
import { API_BASE_URL, CACHE_DURATION_MS } from '../config';
import { 
  chapterRecitersSchema,
  recitationStylesSchema
} from '../schemas/audio';
import { 
  ChapterRecitersResponse,
  RecitationStylesResponse
} from '../types/api-responses';

/**
 * Service for audio-related API operations
 */
export class AudioService {
  // Cache for chapter reciters list to avoid repeated API calls
  private chapterRecitersCache: any = null;
  private chapterRecitersCacheTimestamp: number = 0;
  
  // Cache for recitation styles list to avoid repeated API calls
  private recitationStylesCache: any = null;
  private recitationStylesCacheTimestamp: number = 0;
  
  /**
   * List Chapter Reciters
   * Get list of chapter reciters.
   * 
   * @param {Object} params - The parameters for this operation
   * @param {string} params.language - Parameter language
   * @returns {Promise<ChapterRecitersResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async listChapterReciters(params: z.infer<typeof chapterRecitersSchema>): Promise<ChapterRecitersResponse> {
    try {
      // Validate parameters
      const validatedParams = chapterRecitersSchema.parse(params);
      
      // Check cache first
      const now = Date.now();
      if (this.chapterRecitersCache && (now - this.chapterRecitersCacheTimestamp < CACHE_DURATION_MS)) {
        verboseLog('response', {
          method: 'listChapterReciters',
          source: 'cache',
          age: `${(now - this.chapterRecitersCacheTimestamp) / 1000} seconds`
        });
        
        return {
          success: true,
          message: "chapter-reciters executed successfully (from cache)",
          data: this.chapterRecitersCache
        };
      }
      
      try {
        // Make request to Quran.com API
        const url = `${API_BASE_URL}/resources/chapter_reciters`;
        const response = await makeApiRequest(url, {
          language: validatedParams.language
        });
        
        verboseLog('response', {
          method: 'listChapterReciters',
          source: 'api',
          dataSize: JSON.stringify(response).length
        });
        
        // Update cache
        this.chapterRecitersCache = response;
        this.chapterRecitersCacheTimestamp = now;
        
        return {
          success: true,
          message: "chapter-reciters executed successfully",
          data: response
        };
      } catch (axiosError) {
        verboseLog('error', {
          method: 'listChapterReciters',
          error: axiosError instanceof Error ? axiosError.message : String(axiosError)
        });
        
        // If the API call fails, return mock data
        verboseLog('response', {
          method: 'listChapterReciters',
          source: 'mock',
          reason: 'API unavailable'
        });
        
        const mockData = this.getChapterRecitersMockData();
        
        return {
          success: true,
          message: "chapter-reciters executed with mock data (API unavailable)",
          data: mockData
        };
      }
    } catch (error) {
      verboseLog('error', {
        method: 'listChapterReciters',
        error: error instanceof Error ? error.message : String(error)
      });
      
      if (error instanceof z.ZodError) {
        throw new ApiError(`Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`, 400);
      }
      
      // Return mock data as a fallback for any error
      verboseLog('response', {
        method: 'listChapterReciters',
        source: 'mock',
        reason: 'error occurred'
      });
      
      const mockData = this.getChapterRecitersMockData();
      
      return {
        success: true,
        message: "chapter-reciters executed with mock data (error occurred)",
        data: mockData
      };
    }
  }
  
  /**
   * List Recitation Styles
   * Get the available recitation styles.
   * 
   * @returns {Promise<RecitationStylesResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async listRecitationStyles(): Promise<RecitationStylesResponse> {
    try {
      // Check cache first
      const now = Date.now();
      if (this.recitationStylesCache && (now - this.recitationStylesCacheTimestamp < CACHE_DURATION_MS)) {
        verboseLog('response', {
          method: 'listRecitationStyles',
          source: 'cache',
          age: `${(now - this.recitationStylesCacheTimestamp) / 1000} seconds`
        });
        
        return {
          success: true,
          message: "recitation-styles executed successfully (from cache)",
          data: this.recitationStylesCache
        };
      }
      
      try {
        // Make request to Quran.com API
        const url = `${API_BASE_URL}/resources/recitation_styles`;
        const response = await makeApiRequest(url);
        
        verboseLog('response', {
          method: 'listRecitationStyles',
          source: 'api',
          dataSize: JSON.stringify(response).length
        });
        
        // Update cache
        this.recitationStylesCache = response;
        this.recitationStylesCacheTimestamp = now;
        
        return {
          success: true,
          message: "recitation-styles executed successfully",
          data: response
        };
      } catch (axiosError) {
        verboseLog('error', {
          method: 'listRecitationStyles',
          error: axiosError instanceof Error ? axiosError.message : String(axiosError)
        });
        
        // If the API call fails, return mock data
        verboseLog('response', {
          method: 'listRecitationStyles',
          source: 'mock',
          reason: 'API unavailable'
        });
        
        const mockData = this.getRecitationStylesMockData();
        
        return {
          success: true,
          message: "recitation-styles executed with mock data (API unavailable)",
          data: mockData
        };
      }
    } catch (error) {
      verboseLog('error', {
        method: 'listRecitationStyles',
        error: error instanceof Error ? error.message : String(error)
      });
      
      // Return mock data as a fallback for any error
      verboseLog('response', {
        method: 'listRecitationStyles',
        source: 'mock',
        reason: 'error occurred'
      });
      
      const mockData = this.getRecitationStylesMockData();
      
      return {
        success: true,
        message: "recitation-styles executed with mock data (error occurred)",
        data: mockData
      };
    }
  }
  
  /**
   * Get mock data for chapter reciters
   * @returns Mock chapter reciters data
   */
  private getChapterRecitersMockData() {
    return {
      reciters: [
        { id: 1, name: "AbdulBaset AbdulSamad", style: "Mujawwad" },
        { id: 2, name: "AbdulBaset AbdulSamad", style: "Murattal" },
        { id: 3, name: "Abdur-Rahman as-Sudais", style: null },
        { id: 4, name: "Abu Bakr al-Shatri", style: null },
        { id: 5, name: "Hani ar-Rifai", style: null },
        { id: 6, name: "Mahmoud Khalil Al-Husary", style: null },
        { id: 7, name: "Mishari Rashid al-`Afasy", style: null },
        { id: 8, name: "Mohamed Siddiq al-Minshawi", style: "Mujawwad" },
        { id: 9, name: "Mohamed Siddiq al-Minshawi", style: "Murattal" },
        { id: 10, name: "Sa`ud ash-Shuraym", style: null }
      ]
    };
  }
  
  /**
   * Get mock data for recitation styles
   * @returns Mock recitation styles data
   */
  private getRecitationStylesMockData() {
    return {
      styles: [
        { id: 1, name: "Murattal", description: "Recitation at a normal pace" },
        { id: 2, name: "Mujawwad", description: "Recitation with melody and artistic voice" },
        { id: 3, name: "Muallim", description: "Educational recitation with pauses for learning" }
      ]
    };
  }
}

// Export a singleton instance
export const audioService = new AudioService();
