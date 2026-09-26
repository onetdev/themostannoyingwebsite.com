/**
 * Copy shown by the language suggestion toast.
 *
 * The strings are rendered in the *suggested* language, so they are fetched per
 * locale from the Content API (`translations/{lang}?namespace=languageDetector`)
 * and delivered through `LanguageDetectorMessagesProvider`. The bundled English
 * version is the reference shape and the runtime fallback.
 */
export type LanguageDetectorMessages = {
  detected: string;
  switch: string;
  stay: string;
};

export type LanguageDetectorMessageMap = Record<
  string,
  LanguageDetectorMessages
>;
