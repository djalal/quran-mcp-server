/**
 * Juzs-related services for the Quran.com API MCP Server
 */

import { z } from 'zod';
import { ApiError } from '../types/error';
import { verboseLog } from '../utils/logger';
import { makeApiRequest } from './base-service';
import { API_BASE_URL } from '../config';
import { juzsSchema } from '../schemas/juzs';
import { JuzsResponse } from '../types/api-responses';

/**
 * Service for juzs-related API operations
 */
export class JuzsService {
  /**
   * Get All Juzs
   * Get list of all juzs
   * 
   * @param {Object} params - The parameters for this operation
   * @returns {Promise<JuzsResponse>} The operation result
   * @throws {ApiError} If the operation fails
   */
  async getJuzs(params: z.infer<typeof juzsSchema>): Promise<JuzsResponse> {
    try {
      // Validate parameters
      const validatedParams = juzsSchema.parse(params);
      
      const url = `${API_BASE_URL}/juzs`;
      
      // Make request to Quran.com API
      const data = await makeApiRequest(url, {});
      
      return {
        success: true,
        message: "juzs executed successfully",
        data
      };
    } catch (error) {
      verboseLog('error', {
        method: 'getJuzs',
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
export const juzsService = new JuzsService();
