/**
 * Copy shown by the language suggestion toast.
 *
 * The strings are rendered in the *suggested* language, so they are bundled in
 * `LANGUAGE_DETECTOR_MESSAGES` and delivered through
 * `LanguageDetectorMessagesProvider` rather than resolved for the active locale.
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
