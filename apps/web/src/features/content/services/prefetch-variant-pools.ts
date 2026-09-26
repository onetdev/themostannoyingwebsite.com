import type { LanguageCode, VariantPoolType } from '@maw/content-sdk';
import { type DehydratedState, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/core/http/react/query-client';
import { variantPoolQueryOptions } from './variant-pool-query';

/**
 * Prefetches the given variant pools into a fresh per-request React Query
 * client and returns the dehydrated state, ready to hand to a client
 * `HydrationBoundary`.
 */
export async function prefetchVariantPools(
  lang: LanguageCode,
  types: readonly VariantPoolType[],
): Promise<DehydratedState> {
  const queryClient = getQueryClient();

  await Promise.all(
    types.map((type) =>
      queryClient.prefetchQuery(variantPoolQueryOptions(lang, type)),
    ),
  );

  return dehydrate(queryClient);
}
