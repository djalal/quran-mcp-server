/**
 * Verse-related handlers for the Quran.com API MCP Server
 */

import { z } from 'zod';
import { verboseLog } from '../utils/logger';
import { versesService } from '../services';
import {
  versesByChapterNumberSchema,
  versesByPageNumberSchema,
  versesByJuzNumberSchema,
  versesByHizbNumberSchema,
  versesByRubElHizbNumberSchema,
  versesByVerseKeySchema,
  randomVerseSchema,
} from '../schemas/verses';

/**
 * Handler for the verses-by_chapter_number tool
 */
export async function handleVersesByChapterNumber(args: any) {
  try {
    // Validate arguments
    const validatedArgs = versesByChapterNumberSchema.parse(args);
    
    // Call the service
    const result = await versesService.versesByChapterNumber(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'verses-by_chapter_number',
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
      tool: 'verses-by_chapter_number',
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
 * Handler for the verses-by_page_number tool
 */
export async function handleVersesByPageNumber(args: any) {
  try {
    // Validate arguments
    const validatedArgs = versesByPageNumberSchema.parse(args);
    
    // Call the service
    const result = await versesService.versesByPageNumber(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'verses-by_page_number',
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
      tool: 'verses-by_page_number',
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
 * Handler for the verses-by_juz_number tool
 */
export async function handleVersesByJuzNumber(args: any) {
  try {
    // Validate arguments
    const validatedArgs = versesByJuzNumberSchema.parse(args);
    
    // Call the service
    const result = await versesService.versesByJuzNumber(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'verses-by_juz_number',
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
      tool: 'verses-by_juz_number',
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
 * Handler for the verses-by_hizb_number tool
 */
export async function handleVersesByHizbNumber(args: any) {
  try {
    // Validate arguments
    const validatedArgs = versesByHizbNumberSchema.parse(args);
    
    // Call the service
    const result = await versesService.versesByHizbNumber(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'verses-by_hizb_number',
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
      tool: 'verses-by_hizb_number',
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
 * Handler for the verses-by_rub_el_hizb_number tool
 */
export async function handleVersesByRubElHizbNumber(args: any) {
  try {
    // Validate arguments
    const validatedArgs = versesByRubElHizbNumberSchema.parse(args);
    
    // Call the service
    const result = await versesService.versesByRubElHizbNumber(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'verses-by_rub_el_hizb_number',
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
      tool: 'verses-by_rub_el_hizb_number',
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
 * Handler for the verses-by_verse_key tool
 */
export async function handleVersesByVerseKey(args: any) {
  try {
    // Validate arguments
    const validatedArgs = versesByVerseKeySchema.parse(args);
    
    // Call the service
    const result = await versesService.versesByVerseKey(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'verses-by_verse_key',
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
      tool: 'verses-by_verse_key',
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
 * Handler for the random_verse tool
 */
export async function handleRandomVerse(args: any) {
  try {
    // Validate arguments
    const validatedArgs = randomVerseSchema.parse(args);
    
    // Call the service
    const result = await versesService.randomVerse(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'random_verse',
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
    // Enhanced error logging with more details
    verboseLog('error', {
      tool: 'random_verse',
      error: error instanceof Error 
        ? { 
            name: error.name,
            message: error.message,
            stack: error.stack,
            // Include additional properties if they exist
            ...(error as any)
          } 
        : String(error)
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
    
    // Provide more detailed error message
    const errorMessage = error instanceof Error 
      ? `Error: ${error.name}: ${error.message}` 
      : `Unknown error: ${String(error)}`;
    
    return {
      content: [{ 
        type: "text", 
        text: errorMessage
      }],
      isError: true,
    };
  }
}
