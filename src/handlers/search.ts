/**
 * Search-related handlers for the Quran.com API MCP Server
 */

import { z } from 'zod';
import { verboseLog } from '../utils/logger';
import { searchService } from '../services';
import { searchSchema } from '../schemas/search';

/**
 * Handler for the search tool
 */
export async function handleSearch(args: any) {
  try {
    // Validate arguments
    const validatedArgs = searchSchema.parse(args);
    
    // Call the service
    const result = await searchService.search(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'search',
      result
    });
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    verboseLog('error', {
      tool: 'search',
      error: error instanceof Error ? error.message : String(error)
    });
    
    if (error instanceof z.ZodError) {
      return {
        content: [{ 
          type: "text", 
          text: `Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`
        }],
        isError: true,
      };
    }
    
    return {
      content: [{ 
        type: "text", 
        text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      }],
      isError: true,
    };
  }
}
