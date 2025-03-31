/**
 * API response types for the Quran.com API MCP Server
 */

/**
 * Base API response interface
 */
export interface BaseApiResponse {
  success: boolean;
  message: string;
  data: any; // Use any to allow for the actual API response structure
}

/**
 * Chapter-related response interfaces
 */
export interface ListChaptersResponse extends BaseApiResponse {}
export interface GetChapterResponse extends BaseApiResponse {}
export interface ChapterInfoResponse extends BaseApiResponse {}

/**
 * Verse-related response interfaces
 */
export interface VersesByChapterNumberResponse extends BaseApiResponse {}
export interface VersesByPageNumberResponse extends BaseApiResponse {}
export interface VersesByJuzNumberResponse extends BaseApiResponse {}
export interface VersesByHizbNumberResponse extends BaseApiResponse {}
export interface VersesByRubElHizbNumberResponse extends BaseApiResponse {}
export interface VersesByVerseKeyResponse extends BaseApiResponse {}
export interface RandomVerseResponse extends BaseApiResponse {}

/**
 * Juz-related response interfaces
 */
export interface JuzsResponse extends BaseApiResponse {}

/**
 * Audio-related response interfaces
 */
export interface ChapterReciterAudioFileResponse extends BaseApiResponse {}
export interface ChapterReciterAudioFilesResponse extends BaseApiResponse {}
export interface RecitationsResponse extends BaseApiResponse {}
export interface RecitationAudioFilesResponse extends BaseApiResponse {}
export interface ChapterRecitersResponse extends BaseApiResponse {}
export interface RecitationInfoResponse extends BaseApiResponse {}
export interface RecitationStylesResponse extends BaseApiResponse {}
export interface ListSurahRecitationResponse extends BaseApiResponse {}
export interface ListJuzRecitationResponse extends BaseApiResponse {}
export interface ListPageRecitationResponse extends BaseApiResponse {}
export interface ListRubElHizbRecitationResponse extends BaseApiResponse {}
export interface ListHizbRecitationResponse extends BaseApiResponse {}
export interface ListAyahRecitationResponse extends BaseApiResponse {}

/**
 * Translation-related response interfaces
 */
export interface TranslationResponse extends BaseApiResponse {}
export interface TranslationInfoResponse extends BaseApiResponse {}
export interface TranslationsResponse extends BaseApiResponse {}

/**
 * Tafsir-related response interfaces
 */
export interface TafsirResponse extends BaseApiResponse {}
export interface TafsirsResponse extends BaseApiResponse {}
export interface TafsirInfoResponse extends BaseApiResponse {}

/**
 * Language-related response interfaces
 */
export interface LanguagesResponse extends BaseApiResponse {}

/**
 * Media-related response interfaces
 */
export interface VerseMediaResponse extends BaseApiResponse {}

/**
 * Quran text-related response interfaces
 */
export interface QuranVersesIndopakResponse extends BaseApiResponse {}
export interface QuranVersesUthmaniTajweedResponse extends BaseApiResponse {}
export interface QuranVersesUthmaniResponse extends BaseApiResponse {}
export interface QuranVersesUthmaniSimpleResponse extends BaseApiResponse {}
export interface QuranVersesImlaeiResponse extends BaseApiResponse {}
export interface QuranVersesCodeV1Response extends BaseApiResponse {}
export interface QuranVersesCodeV2Response extends BaseApiResponse {}

/**
 * Search-related response interfaces
 */
export interface SearchResponse extends BaseApiResponse {}
