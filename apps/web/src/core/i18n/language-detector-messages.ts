import {
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  type LanguageCode,
} from '@maw/content-sdk';
import { createAppContentClient } from '@/core/content';
import enMessages from '@/i18n/messages/en';
import type {
  LanguageDetectorMessageMap,
  LanguageDetectorMessages,
} from './language-detector-types';

const FALLBACK: LanguageDetectorMessages = enMessages.languageDetector;

const MESSAGE_KEYS = ['detected', 'switch', 'stay'] as const;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Keeps only the string entries we know how to render so a malformed Content
 * API payload degrades key-by-key to the English reference.
 */
function sanitizeMessages(value: unknown): Partial<LanguageDetectorMessages> {
  if (!isRecord(value)) {
    return {};
  }

  const result: Partial<LanguageDetectorMessages> = {};
  for (const key of MESSAGE_KEYS) {
    const entry = value[key];
    if (typeof entry === 'string' && entry.trim() !== '') {
      result[key] = entry;
    }
  }
  return result;
}

/**
 * Fetches the suggestion-toast copy for a locale from the Content API and
 * merges it over the bundled English reference. Falls back to English when the
 * API is unavailable or the namespace is missing.
 */
export async function fetchLanguageDetectorMessages(
  lang: LanguageCode,
  client: ContentApiClient = createAppContentClient(),
): Promise<LanguageDetectorMessages> {
  if (lang === 'en') {
    return FALLBACK;
  }

  try {
    const response = await client.translations.getByLang(
      lang,
      { namespace: 'languageDetector' },
      {
        next: {
          revalidate: 3600,
          tags: [CONTENT_CACHE_TAGS.translations],
        },
      },
    );

    return { ...FALLBACK, ...sanitizeMessages(response.messages) };
  } catch {
    return FALLBACK;
  }
}

/**
 * Fetches the suggestion-toast copy for every supported locale, keyed by
 * locale code, ready to hand to the client provider.
 */
export async function fetchAllLanguageDetectorMessages(
  langs: readonly string[],
  client?: ContentApiClient,
): Promise<LanguageDetectorMessageMap> {
  const entries = await Promise.all(
    langs.map(
      async (lang) =>
        [
          lang,
          await fetchLanguageDetectorMessages(lang as LanguageCode, client),
        ] as const,
    ),
  );

  return Object.fromEntries(entries);
}
