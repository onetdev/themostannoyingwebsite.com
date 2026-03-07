const config = {
  // Live translations - used for routing, sitemap, and UI language selectors.
  locales: [
    'en', 'hu', 'zh'
  ],
  // All possible languages in the system.
  allLocales: [
    'en', // English
    'hu', // Hungarian
    'zh', // Mandaring Chinese
    'ar', // Arabic
    'de', // German
    'es', // Spanish
    'fr', // French
    'hi', // Hindi
    'it', // Italian
    'ja', // Japanese
    'ko', // Korean
    'pl', // Polish
    'pt', // Portugese
    'ru', // Russian
    'tr', // Turkish
  ],
  defaultLocale: 'en',
} as const;

export default config;
