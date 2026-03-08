const allLocales = [
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
];

const skipLocales = ['es'];

const config = {
  // Live translations - used for routing, sitemap, and UI language selectors.
  locales: allLocales.filter(
    (locale) => skipLocales.includes(locale) === false,
  ),
  allLocales,
  defaultLocale: 'en',
} as const;

export default config;
