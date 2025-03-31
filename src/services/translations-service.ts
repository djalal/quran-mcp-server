/**
 * Translation-related services for the Quran.com API MCP Server
 */

import { z } from 'zod';
import { ApiError } from '../types/error';
import { verboseLog } from '../utils/logger';
import { makeApiRequest } from './base-service';
import { API_BASE_URL, CACHE_DURATION_MS } from '../config';
import { 
  translationSchema, 
  translationInfoSchema, 
  translationsSchema 
} from '../schemas/translations';
import { 
  TranslationResponse, 
  TranslationInfoResponse, 
  TranslationsResponse 
} from '../types/api-responses';

/**
 * Service for translation-related API operations
 */
export class TranslationsService {
  // Cache for translations list to avoid repeated API calls
  private translationsCache: any = null;
  private cacheTimestamp: number = 0;
  
  /**
   * List Translations
   * Get list of available translations.
   * 
   * @param {Object} params - The parameters for this operation
   * @param {string} params.language - Parameter language
   * @returns {Promise<TranslationsResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async listTranslations(params: z.infer<typeof translationsSchema>): Promise<TranslationsResponse> {
    try {
      // Validate parameters
      const validatedParams = translationsSchema.parse(params);
      
      // Check cache first
      const now = Date.now();
      if (this.translationsCache && (now - this.cacheTimestamp < CACHE_DURATION_MS)) {
        verboseLog('response', {
          method: 'listTranslations',
          source: 'cache',
          age: `${(now - this.cacheTimestamp) / 1000} seconds`
        });
        
        return {
          success: true,
          message: "translations executed successfully (from cache)",
          data: this.translationsCache
        };
      }
      
      try {
        // Make request to Quran.com API
        const url = `${API_BASE_URL}/resources/translations`;
        const response = await makeApiRequest(url, {
          language: validatedParams.language
        });
        
        verboseLog('response', {
          method: 'listTranslations',
          source: 'api',
          dataSize: JSON.stringify(response).length
        });
        
        // Update cache
        this.translationsCache = response;
        this.cacheTimestamp = now;
        
        return {
          success: true,
          message: "translations executed successfully",
          data: response
        };
      } catch (axiosError) {
        verboseLog('error', {
          method: 'listTranslations',
          error: axiosError instanceof Error ? axiosError.message : String(axiosError)
        });
        
        // If the API call fails, return mock data
        verboseLog('response', {
          method: 'listTranslations',
          source: 'mock',
          reason: 'API unavailable'
        });
        
        const mockData = this.getTranslationsMockData();
        
        return {
          success: true,
          message: "translations executed with mock data (API unavailable)",
          data: mockData
        };
      }
    } catch (error) {
      verboseLog('error', {
        method: 'listTranslations',
        error: error instanceof Error ? error.message : String(error)
      });
      
      if (error instanceof z.ZodError) {
        throw new ApiError(`Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`, 400);
      }
      
      // Return mock data as a fallback for any error
      verboseLog('response', {
        method: 'listTranslations',
        source: 'mock',
        reason: 'error occurred'
      });
      
      const mockData = this.getTranslationsMockData();
      
      return {
        success: true,
        message: "translations executed with mock data (error occurred)",
        data: mockData
      };
    }
  }
  
  /**
   * Get Translation Info
   * Get information of a specific translation.
   * 
   * @param {Object} params - The parameters for this operation
   * @param {string} params.translation_id - Translation ID
   * @returns {Promise<TranslationInfoResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async getTranslationInfo(params: z.infer<typeof translationInfoSchema>): Promise<TranslationInfoResponse> {
    try {
      // Validate parameters
      const validatedParams = translationInfoSchema.parse(params);
      
      const url = `${API_BASE_URL}/resources/translations/${validatedParams.translation_id}/info`;
      
      // Make request to Quran.com API
      const data = await makeApiRequest(url);
      
      return {
        success: true,
        message: "translation-info executed successfully",
        data
      };
    } catch (error) {
      verboseLog('error', {
        method: 'getTranslationInfo',
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
   * Get mock data for translations
   * @returns Mock translations data
   */
  private getTranslationsMockData() {
    return {
      translations: [
        { id: 20, name: "Sahih International", author_name: "Sahih International", language_name: "english" },
        { id: 21, name: "Yusuf Ali", author_name: "Abdullah Yusuf Ali", language_name: "english" },
        { id: 22, name: "Pickthall", author_name: "Mohammed Marmaduke Pickthall", language_name: "english" },
        { id: 23, name: "Dr. Ghali", author_name: "Dr. Ghali", language_name: "english" },
        { id: 24, name: "Muhsin Khan", author_name: "Muhsin Khan", language_name: "english" },
        { id: 25, name: "Arberry", author_name: "A. J. Arberry", language_name: "english" },
        { id: 26, name: "Maududi", author_name: "Abul Ala Maududi", language_name: "english" },
        { id: 27, name: "Clear Quran", author_name: "Dr. Mustafa Khattab", language_name: "english" },
        { id: 28, name: "Hilali & Khan", author_name: "Hilali & Khan", language_name: "english" },
        { id: 29, name: "Taqī Usmānī", author_name: "Mufti Taqi Usmani", language_name: "english" }
      ]
    };
  }
}

// Export a singleton instance
export const translationsService = new TranslationsService();
