import type { LanguageCode } from '@maw/content-sdk';
import { queryOptions } from '@tanstack/react-query';
import { createAppContentClient } from '@/core/content';
import type { ContentPoolItem, ContentPoolType } from '../types';
import { fetchContentPool } from './get-content-pool';

/**
 * Stable React Query key shared by the server-side prefetch and the client
 * consumers so hydrated data is always read from the same cache entry.
 */
export const contentPoolQueryKey = (
  lang: LanguageCode,
  type: ContentPoolType,
) => ['content-pools', lang, type] as const;

/**
 * React Query options for a Content API resource.
 *
 * Pools are prefetched on the server during rendering (see
 * `prefetchContentPools`), dehydrated into the payload and read from the
 * hydrated cache on the client. `staleTime`/`gcTime` are infinite and the
 * query function refuses to run in the browser, which keeps the Content API
 * calls on the server only (ISR revalidation refreshes the payload).
 */
export function contentPoolQueryOptions<T extends ContentPoolType>(
  lang: LanguageCode,
  type: T,
) {
  return queryOptions({
    queryKey: contentPoolQueryKey(lang, type),
    queryFn: async (): Promise<ContentPoolItem<T>[]> => {
      if (typeof window !== 'undefined') {
        throw new Error(
          `Content pool "${type}" (${lang}) was requested in the browser. ` +
            'Content pools must be prefetched on the server and read from the hydrated cache.',
        );
      }

      const client = createAppContentClient();
      const pool = await fetchContentPool(client, lang, type);
      return pool.items;
    },
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  });
}
