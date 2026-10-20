export type TextDirection = 'ltr' | 'rtl';

/**
 * Locales written right-to-left. Kept as a small static set instead of a
 * dependency because the app only needs the direction flag.
 */
const RTL_LANGUAGES = new Set(['ar', 'fa', 'he', 'ur']);

export function getLangDir(locale: string): TextDirection {
  const language = locale.split('-')[0]?.toLowerCase() ?? '';

  return RTL_LANGUAGES.has(language) ? 'rtl' : 'ltr';
}
