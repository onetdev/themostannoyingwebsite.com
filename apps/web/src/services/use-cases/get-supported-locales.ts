import { LANGUAGE_NATIVE_NAME_MAP } from '@/i18n/language-native-name-map';

export type LanguageInfo = {
  locale: string;
  flag: string;
  label: string;
};

const LANGUAGE_MAP: Record<string, Omit<LanguageInfo, 'locale'>> = {
  ar: { flag: '🇸🇦', label: LANGUAGE_NATIVE_NAME_MAP.ar },
  de: { flag: '🇩🇪', label: LANGUAGE_NATIVE_NAME_MAP.de },
  en: { flag: '🇺🇸', label: LANGUAGE_NATIVE_NAME_MAP.en },
  es: { flag: '🇪🇸', label: LANGUAGE_NATIVE_NAME_MAP.es },
  fr: { flag: '🇫🇷', label: LANGUAGE_NATIVE_NAME_MAP.fr },
  hi: { flag: '🇮🇳', label: LANGUAGE_NATIVE_NAME_MAP.hi },
  hu: { flag: '🇭🇺', label: LANGUAGE_NATIVE_NAME_MAP.hu },
  it: { flag: '🇮🇹', label: LANGUAGE_NATIVE_NAME_MAP.it },
  ja: { flag: '🇯🇵', label: LANGUAGE_NATIVE_NAME_MAP.ja },
  ko: { flag: '🇰🇷', label: LANGUAGE_NATIVE_NAME_MAP.ko },
  pl: { flag: '🇵🇱', label: LANGUAGE_NATIVE_NAME_MAP.pl },
  pt: { flag: '🇵🇹', label: LANGUAGE_NATIVE_NAME_MAP.pt },
  ru: { flag: '🇷🇺', label: LANGUAGE_NATIVE_NAME_MAP.ru },
  tr: { flag: '🇹🇷', label: LANGUAGE_NATIVE_NAME_MAP.tr },
  zh: { flag: '🇨🇳', label: LANGUAGE_NATIVE_NAME_MAP.zh },
};

export function getSupportedLocaleMeta() {
  return LANGUAGE_MAP;
}
