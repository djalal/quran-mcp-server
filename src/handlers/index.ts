/**
 * Export all handlers for the Quran.com API MCP Server
 */

// Chapter-related handlers
export { handleListChapters, handleGetChapter, handleChapterInfo } from './chapters';

// Verse-related handlers
export {
  handleVersesByChapterNumber,
  handleVersesByPageNumber,
  handleVersesByJuzNumber,
  handleVersesByHizbNumber,
  handleVersesByRubElHizbNumber,
  handleVersesByVerseKey,
  handleRandomVerse,
} from './verses';

// Search-related handlers
export { handleSearch } from './search';

// Juzs-related handlers
export { handleJuzs } from './juzs';

// Resource-related handlers
export {
  handleTranslations,
  handleTranslationInfo,
  handleTafsirs,
  handleTafsirInfo,
  handleTafsir,
  handleChapterReciters,
  handleRecitationStyles,
  handleLanguages
} from './resources';
