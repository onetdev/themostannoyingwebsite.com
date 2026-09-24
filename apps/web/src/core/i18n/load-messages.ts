import {
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  createContentClient,
  type LanguageCode,
} from '@maw/content-sdk';
import enMessages from '@/i18n/messages/en';

type MessageTree = Record<string, unknown>;

const isMessageTree = (value: unknown): value is MessageTree =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Deep-merges the remote message tree over the bundled English bundle so that
 * any key missing from the API response falls back to English.
 */
export function mergeMessages(
  base: MessageTree,
  override: MessageTree,
): MessageTree {
  const result: MessageTree = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (value === null || value === undefined) {
      continue;
    }

    const baseValue = result[key];
    result[key] =
      isMessageTree(value) && isMessageTree(baseValue)
        ? mergeMessages(baseValue, value)
        : value;
  }

  return result;
}

/**
 * Loads the translation messages for a locale.
 *
 * English is bundled in the app and always available as the reference and
 * runtime fallback. Every other locale is fetched from the headless Content API
 * and merged over the English bundle. When the API is unreachable the English
 * bundle is returned so the app keeps rendering.
 */
export async function loadMessages(
  locale: AppLocale,
  client: ContentApiClient = createContentClient(),
): Promise<MessageTree> {
  if (locale === 'en') {
    return enMessages;
  }

  try {
    const response = await client.translations.getByLang(
      locale as LanguageCode,
      undefined,
      {
        next: {
          revalidate: 3600,
          tags: [CONTENT_CACHE_TAGS.translations],
        },
      },
    );

    return mergeMessages(enMessages, response.messages as MessageTree);
  } catch {
    return enMessages;
  }
}
