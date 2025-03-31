/**
 * Export all services for the Quran.com API MCP Server
 */

// Export service instances
export { chaptersService } from './chapters-service';
export { versesService } from './verses-service';
export { searchService } from './search-service';
export { juzsService } from './juzs-service';
export { translationsService } from './translations-service';
export { tafsirsService } from './tafsirs-service';
export { audioService } from './audio-service';
export { languagesService } from './languages-service';

// Export service classes for direct imports if needed
export { ChaptersService } from './chapters-service';
export { VersesService } from './verses-service';
export { SearchService } from './search-service';
export { JuzsService } from './juzs-service';
export { TranslationsService } from './translations-service';
export { TafsirsService } from './tafsirs-service';
export { AudioService } from './audio-service';
export { LanguagesService } from './languages-service';

// Export base service utilities
export { makeApiRequest } from './base-service';
