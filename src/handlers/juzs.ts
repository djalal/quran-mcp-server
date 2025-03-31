/**
 * Juzs-related handlers for the Quran.com API MCP Server
 */

import { z } from 'zod';
import { verboseLog } from '../utils/logger';
import { juzsService } from '../services';
import { juzsSchema } from '../schemas/juzs';

/**
 * Handler for the juzs tool
 */
export async function handleJuzs(args: any) {
  try {
    // Validate arguments
    const validatedArgs = juzsSchema.parse(args);
    
    // Call the service
    const result = await juzsService.getJuzs(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'juzs',
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
      tool: 'juzs',
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
