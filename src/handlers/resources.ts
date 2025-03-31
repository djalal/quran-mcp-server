/**
 * Resource-related handlers for the Quran.com API MCP Server
 */

import { z } from 'zod';
import { verboseLog } from '../utils/logger';
import { 
  translationsService, 
  tafsirsService, 
  audioService, 
  languagesService 
} from '../services';
import { 
  translationsSchema, 
  translationInfoSchema 
} from '../schemas/translations';
import { 
  tafsirsSchema, 
  tafsirInfoSchema,
  tafsirSchema
} from '../schemas/tafsirs';
import { 
  chapterRecitersSchema,
  recitationStylesSchema
} from '../schemas/audio';
import { languagesSchema } from '../schemas/languages';

/**
 * Handler for the translations tool
 */
export async function handleTranslations(args: any) {
  try {
    // Validate arguments
    const validatedArgs = translationsSchema.parse(args);
    
    // Call the service
    const result = await translationsService.listTranslations(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'translations',
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
      tool: 'translations',
      error: error instanceof Error ? error.message : String(error)
    });
    
    // Use the standardized error response utility
    const { createErrorResponse } = require('../utils/error-handler');
    return createErrorResponse(error, 'translations');
  }
}

/**
 * Handler for the translation-info tool
 */
export async function handleTranslationInfo(args: any) {
  try {
    // Validate arguments
    const validatedArgs = translationInfoSchema.parse(args);
    
    // Call the service
    const result = await translationsService.getTranslationInfo(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'translation-info',
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
      tool: 'translation-info',
      error: error instanceof Error ? error.message : String(error)
    });
    
    // Use the standardized error response utility
    const { createErrorResponse } = require('../utils/error-handler');
    return createErrorResponse(error, 'translation-info');
  }
}

/**
 * Handler for the tafsirs tool
 */
export async function handleTafsirs(args: any) {
  try {
    // Validate arguments
    const validatedArgs = tafsirsSchema.parse(args);
    
    // Call the service
    const result = await tafsirsService.listTafsirs(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'tafsirs',
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
      tool: 'tafsirs',
      error: error instanceof Error ? error.message : String(error)
    });
    
    // Use the standardized error response utility
    const { createErrorResponse } = require('../utils/error-handler');
    return createErrorResponse(error, 'tafsirs');
  }
}

/**
 * Handler for the tafsir-info tool
 */
export async function handleTafsirInfo(args: any) {
  try {
    // Validate arguments
    const validatedArgs = tafsirInfoSchema.parse(args);
    
    // Call the service
    const result = await tafsirsService.getTafsirInfo(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'tafsir-info',
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
      tool: 'tafsir-info',
      error: error instanceof Error ? error.message : String(error)
    });
    
    // Use the standardized error response utility
    const { createErrorResponse } = require('../utils/error-handler');
    return createErrorResponse(error, 'tafsir-info');
  }
}

/**
 * Handler for the tafsir tool
 */
export async function handleTafsir(args: any) {
  try {
    // Validate arguments
    const validatedArgs = tafsirSchema.parse(args);
    
    // Call the service
    const result = await tafsirsService.getTafsir(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'tafsir',
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
      tool: 'tafsir',
      error: error instanceof Error ? error.message : String(error)
    });
    
    // Use the standardized error response utility
    const { createErrorResponse } = require('../utils/error-handler');
    return createErrorResponse(error, 'tafsir');
  }
}

/**
 * Handler for the chapter-reciters tool
 */
export async function handleChapterReciters(args: any) {
  try {
    // Validate arguments
    const validatedArgs = chapterRecitersSchema.parse(args);
    
    // Call the service
    const result = await audioService.listChapterReciters(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'chapter-reciters',
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
      tool: 'chapter-reciters',
      error: error instanceof Error ? error.message : String(error)
    });
    
    // Use the standardized error response utility
    const { createErrorResponse } = require('../utils/error-handler');
    return createErrorResponse(error, 'chapter-reciters');
  }
}

/**
 * Handler for the recitation-styles tool
 */
export async function handleRecitationStyles(args: any) {
  try {
    // Call the service
    const result = await audioService.listRecitationStyles();
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'recitation-styles',
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
      tool: 'recitation-styles',
      error: error instanceof Error ? error.message : String(error)
    });
    
    // Use the standardized error response utility
    const { createErrorResponse } = require('../utils/error-handler');
    return createErrorResponse(error, 'recitation-styles');
  }
}

/**
 * Handler for the languages tool
 */
export async function handleLanguages(args: any) {
  try {
    // Validate arguments
    const validatedArgs = languagesSchema.parse(args);
    
    // Call the service
    const result = await languagesService.listLanguages(validatedArgs);
    
    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'languages',
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
      tool: 'languages',
      error: error instanceof Error ? error.message : String(error)
    });
    
    // Use the standardized error response utility
    const { createErrorResponse } = require('../utils/error-handler');
    return createErrorResponse(error, 'languages');
  }
}
