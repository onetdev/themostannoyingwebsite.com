import {
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  type LanguageCode,
  type VariantPoolType,
} from '@maw/content-sdk';

export interface VariantPoolResult<T> {
  items: T[];
  /** ISO timestamp of the deployment/database the pool was generated from. */
  updatedAt: string;
}

/**
 * Fetches a dynamic variant pool from the headless Content API, throwing when
 * the request fails.
 *
 * Use this when the caller wants to fail loudly (e.g. React Query prefetching),
 * otherwise prefer `getVariantPool`.
 */
export async function fetchVariantPool<T>(
  client: ContentApiClient,
  lang: LanguageCode,
  type: VariantPoolType,
): Promise<VariantPoolResult<T>> {
  const response = await client.variants.getByType(lang, type, undefined, {
    next: {
      revalidate: 3600,
      tags: [CONTENT_CACHE_TAGS.variants],
    },
  });

  return {
    items: response.items as T[],
    updatedAt: response.updated_at,
  };
}

/**
 * Fetches a dynamic variant pool from the headless Content API.
 *
 * Returns `undefined` when the pool cannot be fetched so that callers can
 * degrade gracefully (e.g. during local dev or when the API is unreachable).
 */
export async function getVariantPool<T>(
  client: ContentApiClient,
  lang: LanguageCode,
  type: VariantPoolType,
): Promise<VariantPoolResult<T> | undefined> {
  try {
    return await fetchVariantPool<T>(client, lang, type);
  } catch {
    return undefined;
  }
}
