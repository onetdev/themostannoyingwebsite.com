import type { LanguageCode, VariantPoolType } from '@maw/content-sdk';
import { queryOptions } from '@tanstack/react-query';
import { createAppContentClient } from '@/core/content';
import { fetchVariantPool } from './get-variant-pool';

/**
 * Stable React Query key shared by the server-side prefetch and the client
 * consumers so hydrated data is always read from the same cache entry.
 */
export const variantPoolQueryKey = (
  lang: LanguageCode,
  type: VariantPoolType,
) => ['variants', lang, type] as const;

/**
 * React Query options for a Content API variant pool.
 *
 * Pools are prefetched on the server during rendering (see
 * `prefetchVariantPools`), dehydrated into the payload and read from the
 * hydrated cache on the client. `staleTime`/`gcTime` are infinite and the
 * query function refuses to run in the browser, which keeps the Content API
 * calls on the server only (ISR revalidation refreshes the payload).
 */
export function variantPoolQueryOptions<T>(
  lang: LanguageCode,
  type: VariantPoolType,
) {
  return queryOptions({
    queryKey: variantPoolQueryKey(lang, type),
    queryFn: async (): Promise<T[]> => {
      if (typeof window !== 'undefined') {
        throw new Error(
          `Variant pool "${type}" (${lang}) was requested in the browser. ` +
            'Variant pools must be prefetched on the server and read from the hydrated cache.',
        );
      }

      const client = createAppContentClient();
      const pool = await fetchVariantPool<T>(client, lang, type);
      return pool.items;
    },
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  });
}
