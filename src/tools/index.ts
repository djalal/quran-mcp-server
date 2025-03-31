/**
 * Tool definitions for the Quran.com API MCP Server
 */

/**
 * Define tool names as const object for type safety
 */
export const ApiTools = {
  list_chapters: "list-chapters",
  GET_chapter: "GET-chapter",
  info: "info",
  verses_by_chapter_number: "verses-by_chapter_number",
  verses_by_page_number: "verses-by_page_number",
  verses_by_juz_number: "verses-by_juz_number",
  verses_by_hizb_number: "verses-by_hizb_number",
  verses_by_rub_el_hizb_number: "verses-by_rub_el_hizb_number",
  verses_by_verse_key: "verses-by_verse_key",
  random_verse: "random_verse",
  juzs: "juzs",
  chapter_reciter_audio_file: "chapter-reciter-audio-file",
  chapter_reciter_audio_files: "chapter-reciter-audio-files",
  recitations: "recitations",
  recitation_autio_files: "recitation-autio-files",
  translation: "translation",
  chapter_reciters: "chapter-reciters",
  tafsir: "tafsir",
  tafsirs: "tafsirs",
  tafsir_info: "tafsir-info",
  recitation_info: "recitation-info",
  translation_info: "translation-info",
  translations: "translations",
  recitation_styles: "recitation-styles",
  languages: "languages",
  chapter_info: "chapter-info",
  verse_media: "verse-media",
  list_surah_recitation: "list-surah-recitation",
  list_juz_recitaiton: "list-juz-recitaiton",
  list_page_recitaiton: "list-page-recitaiton",
  list_rub_el_hizb_recitaiton: "list-rub-el-hizb-recitaiton",
  list_hizb_recitaiton: "list-hizb-recitaiton",
  list_ayah_recitaiton: "list-ayah-recitaiton",
  QURAN_verses_indopak: "QURAN-verses-indopak",
  QURAN_verses_uthmani_tajweed: "QURAN-verses-uthmani-tajweed",
  QURAN_verses_uthmani: "QURAN-verses-uthmani",
  QURAN_verses_uthmani_simple: "QURAN-verses-uthmani_simple",
  QURAN_verses_Imlaei: "QURAN-verses-Imlaei",
  QURAN_verses_code_v1: "QURAN-verses-code_v1",
  QURAN_verses_code_v2: "QURAN-verses-code_v2",
  search: "search",
} as const;

// Create a type from the object values
export type ApiToolsType = typeof ApiTools[keyof typeof ApiTools];

/**
 * Group tools by category for better organization
 */
export const ToolCategories = {
  chapters: [
    ApiTools.list_chapters,
    ApiTools.GET_chapter,
    ApiTools.info,
    ApiTools.chapter_info,
  ],
  verses: [
    ApiTools.verses_by_chapter_number,
    ApiTools.verses_by_page_number,
    ApiTools.verses_by_juz_number,
    ApiTools.verses_by_hizb_number,
    ApiTools.verses_by_rub_el_hizb_number,
    ApiTools.verses_by_verse_key,
    ApiTools.random_verse,
    ApiTools.verse_media,
  ],
  juzs: [
    ApiTools.juzs,
  ],
  audio: [
    ApiTools.chapter_reciter_audio_file,
    ApiTools.chapter_reciter_audio_files,
    ApiTools.recitations,
    ApiTools.recitation_autio_files,
    ApiTools.chapter_reciters,
    ApiTools.recitation_info,
    ApiTools.recitation_styles,
    ApiTools.list_surah_recitation,
    ApiTools.list_juz_recitaiton,
    ApiTools.list_page_recitaiton,
    ApiTools.list_rub_el_hizb_recitaiton,
    ApiTools.list_hizb_recitaiton,
    ApiTools.list_ayah_recitaiton,
  ],
  translations: [
    ApiTools.translation,
    ApiTools.translation_info,
    ApiTools.translations,
  ],
  tafsirs: [
    ApiTools.tafsir,
    ApiTools.tafsirs,
    ApiTools.tafsir_info,
  ],
  languages: [
    ApiTools.languages,
  ],
  quranText: [
    ApiTools.QURAN_verses_indopak,
    ApiTools.QURAN_verses_uthmani_tajweed,
    ApiTools.QURAN_verses_uthmani,
    ApiTools.QURAN_verses_uthmani_simple,
    ApiTools.QURAN_verses_Imlaei,
    ApiTools.QURAN_verses_code_v1,
    ApiTools.QURAN_verses_code_v2,
  ],
  search: [
    ApiTools.search,
  ],
};
