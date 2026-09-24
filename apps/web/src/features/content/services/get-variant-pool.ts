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
 * Fetches a dynamic variant pool from the headless Content API.
 *
 * Returns `undefined` when the pool cannot be fetched so that callers can
 * gracefully fall back to bundled translations (e.g. during local dev or when
 * the API is unreachable).
 */
export async function getVariantPool<T>(
  client: ContentApiClient,
  lang: LanguageCode,
  type: VariantPoolType,
): Promise<VariantPoolResult<T> | undefined> {
  try {
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
  } catch {
    return undefined;
  }
}
