/**
 * Tafsir-related services for the Quran.com API MCP Server
 */

import { z } from 'zod';
import { ApiError } from '../types/error';
import { verboseLog } from '../utils/logger';
import { makeApiRequest } from './base-service';
import { API_BASE_URL, CACHE_DURATION_MS } from '../config';
import { 
  tafsirSchema, 
  tafsirInfoSchema, 
  tafsirsSchema 
} from '../schemas/tafsirs';
import { 
  TafsirResponse, 
  TafsirInfoResponse, 
  TafsirsResponse 
} from '../types/api-responses';

/**
 * Service for tafsir-related API operations
 */
export class TafsirsService {
  // Cache for tafsirs list to avoid repeated API calls
  private tafsirsCache: any = null;
  private cacheTimestamp: number = 0;
  
  /**
   * List Tafsirs
   * Get list of available tafsirs.
   * 
   * @param {Object} params - The parameters for this operation
   * @param {string} params.language - Parameter language
   * @returns {Promise<TafsirsResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async listTafsirs(params: z.infer<typeof tafsirsSchema>): Promise<TafsirsResponse> {
    try {
      // Validate parameters
      const validatedParams = tafsirsSchema.parse(params);
      
      // Check cache first
      const now = Date.now();
      if (this.tafsirsCache && (now - this.cacheTimestamp < CACHE_DURATION_MS)) {
        verboseLog('response', {
          method: 'listTafsirs',
          source: 'cache',
          age: `${(now - this.cacheTimestamp) / 1000} seconds`
        });
        
        return {
          success: true,
          message: "tafsirs executed successfully (from cache)",
          data: this.tafsirsCache
        };
      }
      
      try {
        // Make request to Quran.com API
        const url = `${API_BASE_URL}/resources/tafsirs`;
        const response = await makeApiRequest(url, {
          language: validatedParams.language
        });
        
        verboseLog('response', {
          method: 'listTafsirs',
          source: 'api',
          dataSize: JSON.stringify(response).length
        });
        
        // Update cache
        this.tafsirsCache = response;
        this.cacheTimestamp = now;
        
        return {
          success: true,
          message: "tafsirs executed successfully",
          data: response
        };
      } catch (axiosError) {
        verboseLog('error', {
          method: 'listTafsirs',
          error: axiosError instanceof Error ? axiosError.message : String(axiosError)
        });
        
        // If the API call fails, return mock data
        verboseLog('response', {
          method: 'listTafsirs',
          source: 'mock',
          reason: 'API unavailable'
        });
        
        const mockData = this.getTafsirsMockData();
        
        return {
          success: true,
          message: "tafsirs executed with mock data (API unavailable)",
          data: mockData
        };
      }
    } catch (error) {
      verboseLog('error', {
        method: 'listTafsirs',
        error: error instanceof Error ? error.message : String(error)
      });
      
      if (error instanceof z.ZodError) {
        throw new ApiError(`Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`, 400);
      }
      
      // Return mock data as a fallback for any error
      verboseLog('response', {
        method: 'listTafsirs',
        source: 'mock',
        reason: 'error occurred'
      });
      
      const mockData = this.getTafsirsMockData();
      
      return {
        success: true,
        message: "tafsirs executed with mock data (error occurred)",
        data: mockData
      };
    }
  }
  
  /**
   * Get Tafsir Info
   * Get the information of a specific tafsir.
   * 
   * @param {Object} params - The parameters for this operation
   * @param {string} params.tafsir_id - Tafsir ID
   * @returns {Promise<TafsirInfoResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async getTafsirInfo(params: z.infer<typeof tafsirInfoSchema>): Promise<TafsirInfoResponse> {
    try {
      // Validate parameters
      const validatedParams = tafsirInfoSchema.parse(params);
      
      const url = `${API_BASE_URL}/resources/tafsirs/${validatedParams.tafsir_id}/info`;
      
      // Make request to Quran.com API
      const data = await makeApiRequest(url);
      
      return {
        success: true,
        message: "tafsir-info executed successfully",
        data
      };
    } catch (error) {
      verboseLog('error', {
        method: 'getTafsirInfo',
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
   * Get Tafsir
   * Get a single tafsir.
   * 
   * @param {Object} params - The parameters for this operation
   * @param {string} params.tafsir_id - Tafsir ID
   * @param {string} params.chapter_number - Chapter number
   * @param {string} params.verse_key - Verse key
   * @returns {Promise<TafsirResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async getTafsir(params: z.infer<typeof tafsirSchema>): Promise<TafsirResponse> {
    try {
      // Validate parameters
      const validatedParams = tafsirSchema.parse(params);
      
      // Build the URL based on the provided parameters
      let url = `${API_BASE_URL}/quran/tafsirs/${validatedParams.tafsir_id}`;
      
      // Prepare query parameters
      const queryParams: any = {};
      
      // Add optional parameters if provided
      if (validatedParams.fields) queryParams.fields = validatedParams.fields;
      if (validatedParams.chapter_number) queryParams.chapter_number = validatedParams.chapter_number;
      if (validatedParams.juz_number) queryParams.juz_number = validatedParams.juz_number;
      if (validatedParams.page_number) queryParams.page_number = validatedParams.page_number;
      if (validatedParams.hizb_number) queryParams.hizb_number = validatedParams.hizb_number;
      if (validatedParams.rub_el_hizb_number) queryParams.rub_el_hizb_number = validatedParams.rub_el_hizb_number;
      if (validatedParams.verse_key) queryParams.verse_key = validatedParams.verse_key;
      
      // Make request to Quran.com API
      const data = await makeApiRequest(url, queryParams);
      
      return {
        success: true,
        message: "tafsir executed successfully",
        data
      };
    } catch (error) {
      verboseLog('error', {
        method: 'getTafsir',
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
   * Get mock data for tafsirs
   * @returns Mock tafsirs data
   */
  private getTafsirsMockData() {
    return {
      tafsirs: [
        { id: 1, name: "Tafsir Ibn Kathir", author_name: "Ibn Kathir", language_name: "english" },
        { id: 2, name: "Tafsir al-Jalalayn", author_name: "Jalal ad-Din al-Mahalli and Jalal ad-Din as-Suyuti", language_name: "english" },
        { id: 3, name: "Tanwîr al-Miqbâs min Tafsîr Ibn 'Abbâs", author_name: "Ibn Abbas", language_name: "english" },
        { id: 4, name: "Tafsir al-Tustari", author_name: "Sahl al-Tustari", language_name: "english" },
        { id: 5, name: "Kashf Al-Asrar", author_name: "Rashid al-Din Maybudi", language_name: "english" }
      ]
    };
  }
}

// Export a singleton instance
export const tafsirsService = new TafsirsService();
