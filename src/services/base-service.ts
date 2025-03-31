/**
 * Base service utilities for the Quran.com API MCP Server
 */

import axios from 'axios';
import { ApiError } from '../types/error';
import { verboseLog } from '../utils/logger';
import { API_KEY, REQUEST_TIMEOUT_MS } from '../config';

// Maximum number of retries for API requests
const MAX_RETRIES = 3;
// Delay between retries in milliseconds (starts at 1s, then 2s, then 4s with exponential backoff)
const INITIAL_RETRY_DELAY_MS = 1000;

/**
 * Generic method to make API requests with error handling and retry mechanism
 * @param url The API endpoint URL
 * @param params Query parameters
 * @param retryCount Current retry count (used internally for recursion)
 * @returns The API response data
 * @throws ApiError if the request fails after all retries
 */
export async function makeApiRequest(
  url: string, 
  params: any = {}, 
  retryCount: number = 0
): Promise<any> {
  try {
    verboseLog('request', { 
      url, 
      params,
      retry: retryCount > 0 ? `Retry attempt ${retryCount} of ${MAX_RETRIES}` : undefined
    });
    
    const response = await axios.get(url, {
      params,
      headers: API_KEY ? { 'x-api-key': API_KEY } : undefined,
      timeout: REQUEST_TIMEOUT_MS
    });
    
    verboseLog('response', { 
      status: response.status,
      data: response.data
    });
    
    return response.data;
  } catch (error) {
    // Log the error
    verboseLog('error', {
      url,
      retry: retryCount,
      error: error instanceof Error ? error.message : String(error)
    });
    
    // Check if we should retry the request
    if (
      retryCount < MAX_RETRIES && 
      axios.isAxiosError(error) && 
      (
        // Retry on network errors or server errors (5xx)
        !error.response || 
        (error.response.status >= 500 && error.response.status < 600)
      )
    ) {
      // Calculate delay with exponential backoff
      const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, retryCount);
      
      console.error(`API request failed, retrying in ${delay}ms (attempt ${retryCount + 1} of ${MAX_RETRIES})...`);
      
      // Wait for the delay
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry the request with incremented retry count
      return makeApiRequest(url, params, retryCount + 1);
    }
    
    if (axios.isAxiosError(error)) {
      console.error(`Axios error: ${error.message}`);
      console.error(`Response status: ${error.response?.status}`);
      console.error(`Response data: ${JSON.stringify(error.response?.data, null, 2)}`);
      
      // Construct a more detailed error message
      let errorMessage = `API request failed: ${error.message || 'Unknown error'}`;
      
      // Add response status if available
      if (error.response?.status) {
        errorMessage += ` (Status: ${error.response.status})`;
      }
      
      // Add response data if available
      if (error.response?.data) {
        const dataStr = typeof error.response.data === 'object' 
          ? JSON.stringify(error.response.data)
          : String(error.response.data);
        errorMessage += ` - ${dataStr}`;
      }
      
      // If no network response at all, it might be a connection issue
      if (!error.response) {
        errorMessage += ' - Connection failed or timed out';
      }
      
      throw new ApiError(
        errorMessage, 
        error.response?.status || 500
      );
    }
    
    throw error;
  }
}
