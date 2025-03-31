/**
 * Verse-related services for the Quran.com API MCP Server
 */

import { z } from 'zod';
import { ApiError } from '../types/error';
import { verboseLog } from '../utils/logger';
import { makeApiRequest } from './base-service';
import { API_BASE_URL } from '../config';
import {
  versesByChapterNumberSchema,
  versesByPageNumberSchema,
  versesByJuzNumberSchema,
  versesByHizbNumberSchema,
  versesByRubElHizbNumberSchema,
  versesByVerseKeySchema,
  randomVerseSchema,
} from '../schemas/verses';
import {
  VersesByChapterNumberResponse,
  VersesByPageNumberResponse,
  VersesByJuzNumberResponse,
  VersesByHizbNumberResponse,
  VersesByRubElHizbNumberResponse,
  VersesByVerseKeyResponse,
  RandomVerseResponse,
} from '../types/api-responses';

/**
 * Service for verse-related API operations
 */
export class VersesService {
  /**
   * Get verses by chapter number
   * Get list of verses by Chapter / Surah number.
   * 
   * @param {Object} params - The parameters for this operation
   * @returns {Promise<VersesByChapterNumberResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async versesByChapterNumber(params: z.infer<typeof versesByChapterNumberSchema>): Promise<VersesByChapterNumberResponse> {
    try {
      // Validate parameters
      const validatedParams = versesByChapterNumberSchema.parse(params);
      
      const url = `${API_BASE_URL}/verses/by_chapter/${validatedParams.chapter_number}`;
      
      // Make request to Quran.com API
      const data = await makeApiRequest(url, {
        language: validatedParams.language,
        words: validatedParams.words,
        translations: validatedParams.translations,
        audio: validatedParams.audio,
        tafsirs: validatedParams.tafsirs,
        word_fields: validatedParams.word_fields,
        translation_fields: validatedParams.translation_fields,
        fields: validatedParams.fields,
        page: validatedParams.page,
        per_page: validatedParams.per_page
      });
      
      return {
        success: true,
        message: "verses-by_chapter_number executed successfully",
        data
      };
    } catch (error) {
      verboseLog('error', {
        method: 'versesByChapterNumber',
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
   * Get verses by page number
   * Get all verses of a specific Madani Mushaf page(1 to 604)
   * 
   * @param {Object} params - The parameters for this operation
   * @returns {Promise<VersesByPageNumberResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async versesByPageNumber(params: z.infer<typeof versesByPageNumberSchema>): Promise<VersesByPageNumberResponse> {
    try {
      // Validate parameters
      const validatedParams = versesByPageNumberSchema.parse(params);
      
      const url = `${API_BASE_URL}/verses/by_page/${validatedParams.page_number}`;
      
      // Make request to Quran.com API
      const data = await makeApiRequest(url, {
        language: validatedParams.language,
        words: validatedParams.words,
        translations: validatedParams.translations,
        audio: validatedParams.audio,
        tafsirs: validatedParams.tafsirs,
        word_fields: validatedParams.word_fields,
        translation_fields: validatedParams.translation_fields,
        fields: validatedParams.fields,
        page: validatedParams.page,
        per_page: validatedParams.per_page
      });
      
      return {
        success: true,
        message: "verses-by_page_number executed successfully",
        data
      };
    } catch (error) {
      verboseLog('error', {
        method: 'versesByPageNumber',
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
   * Get verses by juz number
   * Get all verses from a specific juz(1-30).
   * 
   * @param {Object} params - The parameters for this operation
   * @returns {Promise<VersesByJuzNumberResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async versesByJuzNumber(params: z.infer<typeof versesByJuzNumberSchema>): Promise<VersesByJuzNumberResponse> {
    try {
      // Validate parameters
      const validatedParams = versesByJuzNumberSchema.parse(params);
      
      const url = `${API_BASE_URL}/verses/by_juz/${validatedParams.juz_number}`;
      
      // Make request to Quran.com API
      const data = await makeApiRequest(url, {
        language: validatedParams.language,
        words: validatedParams.words,
        translations: validatedParams.translations,
        audio: validatedParams.audio,
        tafsirs: validatedParams.tafsirs,
        word_fields: validatedParams.word_fields,
        translation_fields: validatedParams.translation_fields,
        fields: validatedParams.fields,
        page: validatedParams.page,
        per_page: validatedParams.per_page
      });
      
      return {
        success: true,
        message: "verses-by_juz_number executed successfully",
        data
      };
    } catch (error) {
      verboseLog('error', {
        method: 'versesByJuzNumber',
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
   * Get verses by hizb number
   * Get all verses from a specific Hizb(1-60).
   * 
   * @param {Object} params - The parameters for this operation
   * @returns {Promise<VersesByHizbNumberResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async versesByHizbNumber(params: z.infer<typeof versesByHizbNumberSchema>): Promise<VersesByHizbNumberResponse> {
    try {
      // Validate parameters
      const validatedParams = versesByHizbNumberSchema.parse(params);
      
      const url = `${API_BASE_URL}/verses/by_hizb/${validatedParams.hizb_number}`;
      
      // Make request to Quran.com API
      const data = await makeApiRequest(url, {
        language: validatedParams.language,
        words: validatedParams.words,
        translations: validatedParams.translations,
        audio: validatedParams.audio,
        tafsirs: validatedParams.tafsirs,
        word_fields: validatedParams.word_fields,
        translation_fields: validatedParams.translation_fields,
        fields: validatedParams.fields,
        page: validatedParams.page,
        per_page: validatedParams.per_page
      });
      
      return {
        success: true,
        message: "verses-by_hizb_number executed successfully",
        data
      };
    } catch (error) {
      verboseLog('error', {
        method: 'versesByHizbNumber',
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
   * Get verses by rub el hizb number
   * Get all verses of a specific Rub el Hizb number(1-240).
   * 
   * @param {Object} params - The parameters for this operation
   * @returns {Promise<VersesByRubElHizbNumberResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async versesByRubElHizbNumber(params: z.infer<typeof versesByRubElHizbNumberSchema>): Promise<VersesByRubElHizbNumberResponse> {
    try {
      // Validate parameters
      const validatedParams = versesByRubElHizbNumberSchema.parse(params);
      
      const url = `${API_BASE_URL}/verses/by_rub/${validatedParams.rub_el_hizb_number}`;
      
      // Make request to Quran.com API
      const data = await makeApiRequest(url, {
        language: validatedParams.language,
        words: validatedParams.words,
        translations: validatedParams.translations,
        audio: validatedParams.audio,
        tafsirs: validatedParams.tafsirs,
        word_fields: validatedParams.word_fields,
        translation_fields: validatedParams.translation_fields,
        fields: validatedParams.fields
      });
      
      return {
        success: true,
        message: "verses-by_rub_el_hizb_number executed successfully",
        data
      };
    } catch (error) {
      verboseLog('error', {
        method: 'versesByRubElHizbNumber',
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
   * Get verse by key
   * Get a specific ayah with key. Key is combination of surah number and ayah number.
   * 
   * @param {Object} params - The parameters for this operation
   * @returns {Promise<VersesByVerseKeyResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async versesByVerseKey(params: z.infer<typeof versesByVerseKeySchema>): Promise<VersesByVerseKeyResponse> {
    try {
      // Validate parameters
      const validatedParams = versesByVerseKeySchema.parse(params);
      
      const url = `${API_BASE_URL}/verses/by_key/${validatedParams.verse_key}`;
      
      // Make request to Quran.com API
      const data = await makeApiRequest(url, {
        language: validatedParams.language,
        words: validatedParams.words,
        translations: validatedParams.translations,
        audio: validatedParams.audio,
        tafsirs: validatedParams.tafsirs,
        word_fields: validatedParams.word_fields,
        translation_fields: validatedParams.translation_fields,
        fields: validatedParams.fields
      });
      
      return {
        success: true,
        message: "verses-by_verse_key executed successfully",
        data
      };
    } catch (error) {
      verboseLog('error', {
        method: 'versesByVerseKey',
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
   * Get random verse
   * Get a random verse. You can get random verse from a specific `chapter`,`page`, `juz`, `hizb`, `rub-el-hizb`, `ruku`, `manzil`, or from whole Quran.
   * 
   * @param {Object} params - The parameters for this operation
   * @returns {Promise<RandomVerseResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async randomVerse(params: z.infer<typeof randomVerseSchema>): Promise<RandomVerseResponse> {
    try {
      // Validate parameters
      const validatedParams = randomVerseSchema.parse(params);
      
      const url = `${API_BASE_URL}/verses/random`;
      
      // Make request to Quran.com API
      const data = await makeApiRequest(url, {
        language: validatedParams.language,
        words: validatedParams.words,
        translations: validatedParams.translations,
        audio: validatedParams.audio,
        tafsirs: validatedParams.tafsirs,
        word_fields: validatedParams.word_fields,
        translation_fields: validatedParams.translation_fields,
        fields: validatedParams.fields
      });
      
      return {
        success: true,
        message: "random_verse executed successfully",
        data
      };
    } catch (error) {
      verboseLog('error', {
        method: 'randomVerse',
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
export const versesService = new VersesService();
