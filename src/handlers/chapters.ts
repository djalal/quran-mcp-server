/**
 * Chapter-related handlers for the Quran.com API MCP Server
 */

import { z } from 'zod';
import { verboseLog } from '../utils/logger';
import { chaptersService } from '../services';
import { 
  listChaptersSchema, 
  getChapterSchema, 
  chapterInfoSchema 
} from '../schemas/chapters';

/**
 * Handler for the list-chapters tool
 */
export async function handleListChapters(args: any) {
  try {
    // Validate arguments
    const validatedArgs = listChaptersSchema.parse(args);
    
    // Call the service
    const result = await chaptersService.listChapters(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'list-chapters',
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
      tool: 'list-chapters',
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

/**
 * Handler for the GET-chapter tool
 */
export async function handleGetChapter(args: any) {
  try {
    // Validate arguments
    const validatedArgs = getChapterSchema.parse(args);
    
    // Call the service
    const result = await chaptersService.getChapter(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'GET-chapter',
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
      tool: 'GET-chapter',
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

/**
 * Handler for the info tool
 */
export async function handleChapterInfo(args: any) {
  try {
    // Validate arguments
    const validatedArgs = chapterInfoSchema.parse(args);
    
    // Call the service
    const result = await chaptersService.getChapterInfo(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'info',
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
      tool: 'info',
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
