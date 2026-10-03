import en from '@/i18n/messages/en/language-detector';
import type { LanguageDetectorMessages } from './language-detector-types';

/**
 * Copy shown by the language-suggestion toast, keyed by locale.
 *
 * Unlike the rest of the UI, these strings are rendered in the *suggested*
 * language rather than the page's active locale, so they ship with the app as a
 * bundled cross-language object instead of being served by the Content API for
 * the current locale. The `languageDetector` namespace is therefore
 * intentionally excluded from the English bundle's namespace map (and from the
 * Content API sync). See `adr/0028-english-translation-reference-sync.md`.
 *
 * `satisfies` keeps the key set exhaustive over the configured locales while
 * retaining the literal types for consumers.
 */
export const LANGUAGE_DETECTOR_MESSAGES = {
  ar: {
    detected: 'هل تود قراءته ب{language}؟',
    switch: 'التبديل إلى {language}',
    stay: 'البقاء ب{language}',
  },
  de: {
    detected: 'Möchten Sie es auf {language} lesen?',
    switch: 'Zu {language} wechseln',
    stay: 'Auf {language} bleiben',
  },
  en,
  es: {
    detected: '¿Quieres leerlo en {language}?',
    switch: 'Cambiar a {language}',
    stay: 'Seguir en {language}',
  },
  fr: {
    detected: 'Voulez-vous le lire en {language} ?',
    switch: 'Passer en {language}',
    stay: 'Rester en {language}',
  },
  hi: {
    detected: 'क्या आप इसे {language} में पढ़ना चाहेंगे?',
    switch: '{language} में बदलें',
    stay: '{language} में ही रहें',
  },
  hu: {
    detected: '{language}ul olvasnád?',
    switch: 'Váltás {language}ra',
    stay: 'Maradok {language}ul',
  },
  it: {
    detected: 'Vuoi leggerlo in {language}?',
    switch: 'Passa all’{language}',
    stay: 'Rimani in {language}',
  },
  ja: {
    detected: '{language}で読みますか？',
    switch: '{language}に切り替える',
    stay: '{language}のまま',
  },
  ko: {
    detected: '{language}로 읽으시겠습니까?',
    switch: '{language}로 전환',
    stay: '{language} 유지',
  },
  pl: {
    detected: 'Chcesz czytać po {language}?',
    switch: 'Przełącz na {language}',
    stay: 'Pozostań przy {language}',
  },
  pt: {
    detected: 'Quer ler em {language}?',
    switch: 'Mudar para {language}',
    stay: 'Continuar em {language}',
  },
  ru: {
    detected: 'Хотите читать на {language}?',
    switch: 'Переключиться на {language}',
    stay: 'Остаться на {language}',
  },
  tr: {
    detected: '{language} okumak ister misiniz?',
    switch: '{language}ye geç',
    stay: '{language} devam et',
  },
  zh: {
    detected: '想用{language}阅读吗？',
    switch: '切换到{language}',
    stay: '保持{language}',
  },
} satisfies Record<AppLocale, LanguageDetectorMessages>;
