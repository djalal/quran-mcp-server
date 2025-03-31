#!/usr/bin/env node
/**
 * Quran.com API MCP Server
 * 
 * This server provides tools for interacting with the Quran.com API.
 * 
 * @version 1.0.0
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
  RequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');
const { zodToJsonSchema } = require('zod-to-json-schema');
const { z } = require('zod');

// Import configuration
const { VERBOSE_MODE } = require('./config');

// Import tools
const { ApiTools } = require('./tools');

// Import schemas
const {
  chaptersSchemas,
  versesSchemas,
  juzsSchemas,
  searchSchemas,
  translationsSchemas,
  tafsirsSchemas,
  audioSchemas,
  languagesSchemas,
} = require('./schemas');

// Import handlers
const {
  handleListChapters,
  handleGetChapter,
  handleChapterInfo,
  handleVersesByChapterNumber,
  handleVersesByPageNumber,
  handleVersesByJuzNumber,
  handleVersesByHizbNumber,
  handleVersesByRubElHizbNumber,
  handleVersesByVerseKey,
  handleRandomVerse,
  handleSearch,
  handleJuzs,
  handleTranslations,
  handleTranslationInfo,
  handleTafsirs,
  handleTafsirInfo,
  handleTafsir,
  handleChapterReciters,
  handleRecitationStyles,
  handleLanguages,
} = require('./handlers');

// Import utilities
const { verboseLog } = require('./utils/logger');
const { createErrorResponse } = require('./utils/error-handler');

// Import examples
const { toolExamples } = require('./examples');

// Define custom request schemas for prompts methods using Zod
const PromptsListRequestSchema = z.object({
  method: z.literal('prompts/list'),
  params: z.object({}).optional()
});

const PromptsGetRequestSchema = z.object({
  method: z.literal('prompts/get'),
  params: z.object({
    id: z.string()
  })
});

// Server configuration
const server = new Server(
  {
    name: "Quran.com API",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {}, // Add support for prompts
    },
  },
);

/**
 * Handle prompts/list method
 */
server.setRequestHandler(PromptsListRequestSchema, async (request: any) => {
  console.error("Handling prompts/list request");
  return {
    prompts: [] // Return an empty array of prompts
  };
});

/**
 * Handle prompts/get method
 */
server.setRequestHandler(PromptsGetRequestSchema, async (request: any) => {
  console.error("Handling prompts/get request for id:", request.params.id);
  // Since we don't have any prompts, we'll return a not found error
  throw new McpError(ErrorCode.NotFound, `Prompt with id ${request.params.id} not found`);
});

/**
 * List available tools
 */
server.setRequestHandler(ListToolsRequestSchema, async (request: any) => ({
  tools: [
    {
      name: ApiTools.list_chapters,
      description: "List Chapters",
      inputSchema: zodToJsonSchema(chaptersSchemas.listChapters),
      examples: toolExamples['list-chapters'],
    },
    {
      name: ApiTools.GET_chapter,
      description: "Get Chapter",
      inputSchema: zodToJsonSchema(chaptersSchemas.getChapter),
      examples: toolExamples['GET-chapter'],
    },
    {
      name: ApiTools.info,
      description: "Get Chapter Info",
      inputSchema: zodToJsonSchema(chaptersSchemas.chapterInfo),
    },
    {
      name: ApiTools.verses_by_chapter_number,
      description: "Get verses by Chapter / Surah number",
      inputSchema: zodToJsonSchema(versesSchemas.versesByChapterNumber),
      examples: toolExamples['verses-by_chapter_number'],
    },
    {
      name: ApiTools.verses_by_page_number,
      description: "Get all verses of a specific Madani Mushaf page",
      inputSchema: zodToJsonSchema(versesSchemas.versesByPageNumber),
    },
    {
      name: ApiTools.verses_by_juz_number,
      description: "Get verses by Juz number",
      inputSchema: zodToJsonSchema(versesSchemas.versesByJuzNumber),
    },
    {
      name: ApiTools.verses_by_hizb_number,
      description: "Get verses by Hizb number",
      inputSchema: zodToJsonSchema(versesSchemas.versesByHizbNumber),
    },
    {
      name: ApiTools.verses_by_rub_el_hizb_number,
      description: "Get verses by Rub el Hizb number",
      inputSchema: zodToJsonSchema(versesSchemas.versesByRubElHizbNumber),
    },
    {
      name: ApiTools.verses_by_verse_key,
      description: "Get verse by key",
      inputSchema: zodToJsonSchema(versesSchemas.versesByVerseKey),
      examples: toolExamples['verses-by_verse_key'],
    },
    {
      name: ApiTools.random_verse,
      description: "Get a random verse",
      inputSchema: zodToJsonSchema(versesSchemas.randomVerse),
      examples: toolExamples['random_verse'],
    },
    {
      name: ApiTools.juzs,
      description: "Get list of all juzs",
      inputSchema: zodToJsonSchema(juzsSchemas.juzs),
      examples: toolExamples['juzs'],
    },
    {
      name: ApiTools.search,
      description: "Search the Quran for specific terms",
      inputSchema: zodToJsonSchema(searchSchemas.search),
      examples: toolExamples['search'],
    },
    // Translation-related tools
    {
      name: ApiTools.translations,
      description: "Get list of available translations",
      inputSchema: zodToJsonSchema(translationsSchemas.translations),
      examples: toolExamples['translations'],
    },
    {
      name: ApiTools.translation_info,
      description: "Get information of a specific translation",
      inputSchema: zodToJsonSchema(translationsSchemas.translationInfo),
    },
    // Tafsir-related tools
    {
      name: ApiTools.tafsirs,
      description: "Get list of available tafsirs",
      inputSchema: zodToJsonSchema(tafsirsSchemas.tafsirs),
      examples: toolExamples['tafsirs'],
    },
    {
      name: ApiTools.tafsir_info,
      description: "Get the information of a specific tafsir",
      inputSchema: zodToJsonSchema(tafsirsSchemas.tafsirInfo),
    },
    {
      name: ApiTools.tafsir,
      description: "Get a single tafsir",
      inputSchema: zodToJsonSchema(tafsirsSchemas.tafsir),
    },
    // Audio-related tools
    {
      name: ApiTools.chapter_reciters,
      description: "List of Chapter Reciters",
      inputSchema: zodToJsonSchema(audioSchemas.chapterReciters),
    },
    {
      name: ApiTools.recitation_styles,
      description: "Get the available recitation styles",
      inputSchema: zodToJsonSchema(audioSchemas.recitationStyles),
    },
    // Language-related tools
    {
      name: ApiTools.languages,
      description: "Get all languages",
      inputSchema: zodToJsonSchema(languagesSchemas.languages),
      examples: toolExamples['languages'],
    },
  ],
}));

/**
 * Handle tool calls
 */
server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
  try {
    if (!request.params.arguments) {
      throw new McpError(ErrorCode.InvalidParams, "Arguments are required");
    }
    
    // Log the incoming request in verbose mode
    verboseLog('request', {
      tool: request.params.name,
      arguments: request.params.arguments
    });

    switch (request.params.name) {
      // Chapter-related tools
      case ApiTools.list_chapters:
        return await handleListChapters(request.params.arguments);
      case ApiTools.GET_chapter:
        return await handleGetChapter(request.params.arguments);
      case ApiTools.info:
        return await handleChapterInfo(request.params.arguments);
      
      // Verse-related tools
      case ApiTools.verses_by_chapter_number:
        return await handleVersesByChapterNumber(request.params.arguments);
      case ApiTools.verses_by_page_number:
        return await handleVersesByPageNumber(request.params.arguments);
      case ApiTools.verses_by_juz_number:
        return await handleVersesByJuzNumber(request.params.arguments);
      case ApiTools.verses_by_hizb_number:
        return await handleVersesByHizbNumber(request.params.arguments);
      case ApiTools.verses_by_rub_el_hizb_number:
        return await handleVersesByRubElHizbNumber(request.params.arguments);
      case ApiTools.verses_by_verse_key:
        return await handleVersesByVerseKey(request.params.arguments);
      case ApiTools.random_verse:
        return await handleRandomVerse(request.params.arguments);
      
      // Juzs-related tools
      case ApiTools.juzs:
        return await handleJuzs(request.params.arguments);
      
      // Search-related tools
      case ApiTools.search:
        return await handleSearch(request.params.arguments);
      
      // Translation-related tools
      case ApiTools.translations:
        return await handleTranslations(request.params.arguments);
      case ApiTools.translation_info:
        return await handleTranslationInfo(request.params.arguments);
      
      // Tafsir-related tools
      case ApiTools.tafsirs:
        return await handleTafsirs(request.params.arguments);
      case ApiTools.tafsir_info:
        return await handleTafsirInfo(request.params.arguments);
      case ApiTools.tafsir:
        return await handleTafsir(request.params.arguments);
      
      // Audio-related tools
      case ApiTools.chapter_reciters:
        return await handleChapterReciters(request.params.arguments);
      case ApiTools.recitation_styles:
        return await handleRecitationStyles(request.params.arguments);
      
      // Language-related tools
      case ApiTools.languages:
        return await handleLanguages(request.params.arguments);
      
      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
    }
  } catch (error) {
    console.error("Error processing request:", error);
    
    if (error instanceof McpError) {
      throw error; // Let the MCP SDK handle MCP-specific errors
    }
    
    // Use the error handler utility to create a standardized error response
    // This logs detailed error info but returns a generic message to clients
    return createErrorResponse(error, request.params.name);
  }
});

/**
 * Start the server
 */
async function runServer() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Quran.com API MCP Server running on stdio");
  } catch (error) {
    console.error("Fatal error starting server:", error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled promise rejection:', reason);
  process.exit(1);
});

// Run the server
runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
