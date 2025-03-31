/**
 * Export all schemas for the Quran.com API MCP Server
 */

import chaptersSchemas from './chapters';
import versesSchemas from './verses';
import audioSchemas from './audio';
import translationsSchemas from './translations';
import tafsirsSchemas from './tafsirs';
import juzsSchemas from './juzs';
import languagesSchemas from './languages';
import quranTextSchemas from './quran-text';
import searchSchemas from './search';

// Export all schemas
export {
  chaptersSchemas,
  versesSchemas,
  audioSchemas,
  translationsSchemas,
  tafsirsSchemas,
  juzsSchemas,
  languagesSchemas,
  quranTextSchemas,
  searchSchemas,
};

// Export individual schemas for direct imports
export * from './chapters';
export * from './verses';
export * from './audio';
export * from './translations';
export * from './tafsirs';
export * from './juzs';
export * from './languages';
export * from './quran-text';
export * from './search';
