const config = {
  // Live translations - used for routing, sitemap, and UI language selectors.
  locales: ['en', 'hu', 'zh', 'ar', 'de', 'pt'],
  // All possible languages in the system.
  allLocales: [
    'en', // English
    'hu', // Hungarian
    'zh', // Mandarin Chinese
    'ar', // Arabic
    'de', // German
    'es', // Spanish
    'fr', // French
    'hi', // Hindi
    'it', // Italian
    'ja', // Japanese
    'ko', // Korean
    'pl', // Polish
    'pt', // Portuguese
    'ru', // Russian
    'tr', // Turkish
  ],
  defaultLocale: 'en',
} as const;

export default config;
