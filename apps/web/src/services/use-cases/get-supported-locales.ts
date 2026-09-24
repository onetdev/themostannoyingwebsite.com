import {
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  createContentClient,
} from '@maw/content-sdk';
import { LANGUAGE_NATIVE_NAME_MAP } from '@/i18n/language-native-name-map';
import i18nConfig from '@/root/i18n.config';

export type LanguageInfo = {
  locale: string;
  flag: string;
  label: string;
};

export type SupportedLocaleMeta = Omit<LanguageInfo, 'locale'>;

const LANGUAGE_FLAG_MAP: Record<string, string> = {
  ar: '🇸🇦',
  de: '🇩🇪',
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
  hi: '🇮🇳',
  hu: '🇭🇺',
  it: '🇮🇹',
  ja: '🇯🇵',
  ko: '🇰🇷',
  pl: '🇵🇱',
  pt: '🇵🇹',
  ru: '🇷🇺',
  tr: '🇹🇷',
  zh: '🇨🇳',
};

const FALLBACK_LOCALE_META: Record<string, SupportedLocaleMeta> =
  Object.fromEntries(
    Object.entries(LANGUAGE_NATIVE_NAME_MAP).map(([locale, label]) => [
      locale,
      { flag: LANGUAGE_FLAG_MAP[locale] ?? '', label },
    ]),
  );

/**
 * Bundled locale metadata, used as a synchronous fallback and as the initial
 * value while the Content API response is being fetched.
 */
export function getSupportedLocaleMeta(): Record<string, SupportedLocaleMeta> {
  return FALLBACK_LOCALE_META;
}

/**
 * Fetches supported locale metadata from the headless Content API, falling back
 * to the bundled map when the API is unavailable.
 */
export async function fetchSupportedLocaleMeta(
  client: ContentApiClient = createContentClient(),
): Promise<Record<string, SupportedLocaleMeta>> {
  try {
    const response = await client.locales.list(undefined, {
      next: {
        revalidate: 86400,
        tags: [CONTENT_CACHE_TAGS.locales],
      },
    });

    return Object.fromEntries(
      response.items.map((item) => [
        item.code,
        {
          flag: LANGUAGE_FLAG_MAP[item.code] ?? '',
          label: item.native_name,
        },
      ]),
    );
  } catch {
    return FALLBACK_LOCALE_META;
  }
}

function buildSupportedLanguages(
  meta: Record<string, SupportedLocaleMeta>,
): LanguageInfo[] {
  return i18nConfig.locales.map((locale) => {
    const langInfo = meta[locale];
    if (!langInfo) {
      throw new Error(
        `Language configuration is missing for locale: "${locale}"`,
      );
    }
    return {
      locale,
      ...langInfo,
    };
  });
}

/**
 * Synchronously returns the bundled supported languages.
 */
export function getSupportedLanguages(): LanguageInfo[] {
  return buildSupportedLanguages(FALLBACK_LOCALE_META);
}

/**
 * Fetches the supported languages from the Content API, falling back to the
 * bundled metadata when the API is unavailable.
 */
export async function fetchSupportedLanguages(
  client?: ContentApiClient,
): Promise<LanguageInfo[]> {
  const meta = await fetchSupportedLocaleMeta(client);
  return buildSupportedLanguages(meta);
}
