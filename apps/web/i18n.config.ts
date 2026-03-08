const config = {
  // Live translations - used for routing, sitemap, and UI language selectors.
  locales: [
    'ar',
    'de',
    'en',
    'fr',
    'hi',
    'hu',
    'it',
    'ja',
    'ko',
    'pl',
    'pt',
    'ru',
    'tr',
    'zh',
  ],
  // All possible languages in the system.
  allLocales: [
    'ar', // Arabic
    'de', // German
    'en', // English
    'es', // Spanish
    'fr', // French
    'hi', // Hindi
    'hu', // Hungarian
    'it', // Italian
    'ja', // Japanese
    'ko', // Korean
    'pl', // Polish
    'pt', // Portuguese
    'ru', // Russian
    'tr', // Turkish
    'zh', // Mandarin Chinese
  ],
  defaultLocale: 'en',
} as const;

export default config;
