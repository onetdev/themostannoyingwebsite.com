import { CONTENT_CACHE_TAGS, type ContentApiClient } from '@maw/content-sdk';
import { createAppContentClient } from '@/core/content';
import { LANGUAGE_NATIVE_NAME_MAP } from '@/i18n/language-native-name-map';
import i18nConfig from '@/root/i18n.config';

export type LanguageInfo = {
  locale: string;
  flag: string;
  label: string;
};

export type SupportedLocaleMeta = Omit<LanguageInfo, 'locale'>;

// The Content API provides native names but not flags, so flags stay bundled
// here and are resolved by locale code for both API and fallback responses.
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
 * Fetches supported locale metadata from the headless Content API, throwing if
 * the request fails. Prefer `fetchSupportedLocaleMeta` in runtime code that
 * must degrade gracefully; use this when the caller wants to fail loudly
 * (e.g. the build-time locale catalog generation).
 */
export async function fetchSupportedLocaleMetaStrict(
  client: ContentApiClient = createAppContentClient(),
): Promise<Record<string, SupportedLocaleMeta>> {
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
}

/**
 * Fetches supported locale metadata from the headless Content API, falling back
 * to the bundled map when the API is unavailable.
 */
export async function fetchSupportedLocaleMeta(
  client: ContentApiClient = createAppContentClient(),
): Promise<Record<string, SupportedLocaleMeta>> {
  try {
    return await fetchSupportedLocaleMetaStrict(client);
  } catch {
    return FALLBACK_LOCALE_META;
  }
}

export function buildSupportedLanguages(
  meta: Record<string, SupportedLocaleMeta>,
): LanguageInfo[] {
  return i18nConfig.locales.flatMap((locale) => {
    const langInfo = meta[locale];
    // Locales without bundled metadata are provided by the Content API at
    // runtime; the synchronous fallback only carries what the app bundles.
    return langInfo ? [{ locale, ...langInfo }] : [];
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
