// Why don't we have these messages in translations files?
// Easy: To avoid bundling large translation files with each page.
// This serves as the bare minimum to allow prompting users to change locale.

export const LANGUAGES_IN_OWN_LANGUAGE: Record<AppSupportedLocale, string> = {
  ar: 'العربية',
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  hi: 'हिन्दी',
  hu: 'Magyar',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  pl: 'Polski',
  pt: 'Português',
  ru: 'Русский',
  tr: 'Türkçe',
  zh: '中文',
};

export const COUNTRY_TO_LOCALE: Record<string, AppLocale> = {
  // Hungarian
  HU: 'hu',

  // Chinese
  CN: 'zh',
  TW: 'zh',
  HK: 'zh',
  MO: 'zh',
  SG: 'zh',

  // English
  US: 'en',
  GB: 'en',
  CA: 'en',
  AU: 'en',
  NZ: 'en',
  IE: 'en',
  ZA: 'en',
  PH: 'en',

  // Arabic
  AE: 'ar',
  SA: 'ar',
  EG: 'ar',
  DZ: 'ar',
  MA: 'ar',
  IQ: 'ar',
  JO: 'ar',
  KW: 'ar',
  LB: 'ar',
  OM: 'ar',
  QA: 'ar',
  SY: 'ar',
  YE: 'ar',
  BH: 'ar',
  LY: 'ar',
  TN: 'ar',
  SD: 'ar',

  // German
  DE: 'de',
  AT: 'de',
  LI: 'de',

  // Spanish
  // ES: 'es',
  // MX: 'es',
  // AR: 'es',
  // CO: 'es',
  // CL: 'es',
  // PE: 'es',
  // VE: 'es',
  // EC: 'es',
  // GT: 'es',
  // CU: 'es',
  // BO: 'es',
  // DO: 'es',
  // HN: 'es',
  // PY: 'es',
  // SV: 'es',
  // NI: 'es',
  // CR: 'es',
  // PA: 'es',
  // UY: 'es',

  // French
  FR: 'fr',
  BE: 'fr',
  CH: 'fr',
  LU: 'fr',
  MC: 'fr',

  // Hindi
  IN: 'hi',

  // Italian
  IT: 'it',
  SM: 'it',
  VA: 'it',

  // Japanese
  JP: 'ja',

  // Korean
  KR: 'ko',

  // Polish
  PL: 'pl',

  // Portuguese
  PT: 'pt',
  BR: 'pt',
  AO: 'pt',
  MZ: 'pt',
  CV: 'pt',
  GW: 'pt',
  ST: 'pt',
  TL: 'pt',

  // Russian
  RU: 'ru',
  BY: 'ru',
  KZ: 'ru',
  KG: 'ru',

  // Turkish
  TR: 'tr',
  CY: 'tr',
};

type DetectorMessages = {
  detected: string;
  switch: string;
  stay: string;
};

export const LOCALE_DETECTOR_MESSAGES: Record<
  AppSupportedLocale,
  DetectorMessages
> = {
  en: {
    detected: 'Would you like to read it in English?',
    switch: 'Switch to English',
    stay: 'Stay in English',
  },

  hu: {
    detected: 'Magyarul olvasnád?',
    switch: 'Váltás magyarra',
    stay: 'Maradok magyarul',
  },

  zh: {
    detected: '想用中文阅读吗？',
    switch: '切换到中文',
    stay: '保持中文',
  },

  ar: {
    detected: 'هل تود قراءته بالعربية؟',
    switch: 'التبديل إلى العربية',
    stay: 'البقاء بالعربية',
  },

  de: {
    detected: 'Möchten Sie es auf Deutsch lesen?',
    switch: 'Zu Deutsch wechseln',
    stay: 'Auf Deutsch bleiben',
  },

  es: {
    detected: '¿Quieres leerlo en español?',
    switch: 'Cambiar a español',
    stay: 'Seguir en español',
  },

  fr: {
    detected: 'Voulez-vous le lire en français ?',
    switch: 'Passer en français',
    stay: 'Rester en français',
  },

  hi: {
    detected: 'क्या आप इसे हिंदी में पढ़ना चाहेंगे?',
    switch: 'हिंदी में बदलें',
    stay: 'हिंदी में ही रहें',
  },

  it: {
    detected: 'Vuoi leggerlo in italiano?',
    switch: 'Passa all’italiano',
    stay: 'Rimani in italiano',
  },

  ja: {
    detected: '日本語で読みますか？',
    switch: '日本語に切り替える',
    stay: '日本語のまま',
  },

  ko: {
    detected: '한국어로 읽으시겠습니까?',
    switch: '한국어로 전환',
    stay: '한국어 유지',
  },

  pl: {
    detected: 'Chcesz czytać po polsku?',
    switch: 'Przełącz na polski',
    stay: 'Pozostań przy polskim',
  },

  pt: {
    detected: 'Quer ler em português?',
    switch: 'Mudar para português',
    stay: 'Continuar em português',
  },

  ru: {
    detected: 'Хотите читать на русском?',
    switch: 'Переключиться на русский',
    stay: 'Остаться на русском',
  },

  tr: {
    detected: 'Türkçe okumak ister misiniz?',
    switch: 'Türkçeye geç',
    stay: 'Türkçe devam et',
  },
};
