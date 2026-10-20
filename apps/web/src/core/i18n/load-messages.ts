import { parse } from '@formatjs/icu-messageformat-parser';
import {
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  type LanguageCode,
} from '@maw/content-sdk';
import { createAppContentClient } from '@/core/content';
import enMessages from '@/i18n/messages/en';

type MessageTree = Record<string, unknown>;

const isMessageTree = (value: unknown): value is MessageTree =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Returns `true` when next-intl can render a message. next-intl builds an
 * `IntlMessageFormat` at render time and throws `INVALID_MESSAGE` on malformed
 * rich-text tags, plurals or placeholders, so remote messages are validated
 * with the same ICU grammar before they are used.
 *
 * Messages without ICU syntax (`<`/`{`) can never fail to parse, so they skip
 * the parser to keep the per-request cost negligible.
 */
export function isParseableMessage(message: string): boolean {
  if (!message.includes('<') && !message.includes('{')) {
    return true;
  }

  try {
    parse(message);
    return true;
  } catch {
    return false;
  }
}

/**
 * Deep-merges the remote message tree over the bundled English bundle so that
 * any key missing from the API response falls back to English.
 *
 * A remote string that ICU cannot parse is skipped (keeping the English value)
 * and its dotted key path is appended to `dropped`.
 */
export function mergeMessages(
  base: MessageTree,
  override: MessageTree,
  dropped: string[] = [],
  path: string[] = [],
): MessageTree {
  const result: MessageTree = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (typeof value === 'string' && !isParseableMessage(value)) {
      dropped.push([...path, key].join('.'));
      continue;
    }

    const baseValue = result[key];
    result[key] =
      isMessageTree(value) && isMessageTree(baseValue)
        ? mergeMessages(baseValue, value, dropped, [...path, key])
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
  client: ContentApiClient = createAppContentClient(),
  onFallback?: (error: unknown) => void,
  onInvalidMessages?: (keys: string[]) => void,
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

    const dropped: string[] = [];
    const messages = mergeMessages(
      enMessages,
      response.messages as MessageTree,
      dropped,
    );

    if (dropped.length > 0) {
      onInvalidMessages?.(dropped);
    }

    return messages;
  } catch (error) {
    onFallback?.(error);
    return enMessages;
  }
}
