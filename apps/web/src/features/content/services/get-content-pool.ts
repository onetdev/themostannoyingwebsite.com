import {
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  type LanguageCode,
  type RequestOptions,
} from '@maw/content-sdk';
import type { ContentPoolItem, ContentPoolType } from '../types';

export interface ContentPoolResult<T> {
  items: T[];
  /** ISO timestamp of the deployment/database the pool was generated from. */
  updatedAt: string;
}

interface RawContentPoolResult {
  items: unknown[];
  updatedAt: string;
}

function cacheTagFor(type: ContentPoolType): string {
  switch (type) {
    case 'survey':
      return CONTENT_CACHE_TAGS.survey;
    case 'prize-wheel':
      return CONTENT_CACHE_TAGS.prizeWheel;
    case 'newsletter':
      return CONTENT_CACHE_TAGS.newsletter;
    case 'spam-sample':
      return CONTENT_CACHE_TAGS.spamSample;
    default:
      return CONTENT_CACHE_TAGS.pools;
  }
}

async function requestContentPool(
  client: ContentApiClient,
  lang: LanguageCode,
  type: ContentPoolType,
  options: RequestOptions,
): Promise<RawContentPoolResult> {
  switch (type) {
    case 'survey': {
      const response = await client.survey.getQuestions(lang, options);
      return { items: response.questions, updatedAt: response.updated_at };
    }
    case 'prize-wheel': {
      const response = await client.prizeWheel.getSegments(lang, options);
      return { items: response.segments, updatedAt: response.updated_at };
    }
    case 'newsletter': {
      const response = await client.newsletter.getSteps(lang, options);
      return { items: response.steps, updatedAt: response.updated_at };
    }
    case 'spam-sample': {
      const response = await client.spamSample.list(lang, options);
      return { items: response.samples, updatedAt: response.updated_at };
    }
    default: {
      const response = await client.pools.getByType(lang, type, options);
      return { items: response.items, updatedAt: response.updated_at };
    }
  }
}

/**
 * Fetches a Content API resource as a pool, throwing when the request fails.
 *
 * Dispatches to the correct endpoint (generic string pool vs dedicated
 * structured resource) and normalizes the response to a flat item list.
 *
 * Use this when the caller wants to fail loudly (e.g. React Query prefetching),
 * otherwise prefer `getContentPool`.
 */
export async function fetchContentPool<T extends ContentPoolType>(
  client: ContentApiClient,
  lang: LanguageCode,
  type: T,
): Promise<ContentPoolResult<ContentPoolItem<T>>> {
  const { items, updatedAt } = await requestContentPool(client, lang, type, {
    next: {
      revalidate: 3600,
      tags: [cacheTagFor(type)],
    },
  });

  return {
    items: items as ContentPoolItem<T>[],
    updatedAt,
  };
}

/**
 * Fetches a Content API resource as a pool.
 *
 * Returns `undefined` when the pool cannot be fetched so that callers can
 * degrade gracefully (e.g. during local dev or when the API is unreachable).
 */
export async function getContentPool<T extends ContentPoolType>(
  client: ContentApiClient,
  lang: LanguageCode,
  type: T,
): Promise<ContentPoolResult<ContentPoolItem<T>> | undefined> {
  try {
    return await fetchContentPool(client, lang, type);
  } catch {
    return undefined;
  }
}
