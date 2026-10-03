import type { LanguageCode } from '@maw/content-sdk';
import { type DehydratedState, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/core/http/react/query-client';
import type { ContentPoolType } from '../types';
import { contentPoolQueryOptions } from './content-pool-query';

/**
 * Prefetches the given Content API resources into a fresh per-request React
 * Query client and returns the dehydrated state, ready to hand to a client
 * `HydrationBoundary`.
 */
export async function prefetchContentPools(
  lang: LanguageCode,
  types: readonly ContentPoolType[],
): Promise<DehydratedState> {
  const queryClient = getQueryClient();

  await Promise.all(
    types.map((type) =>
      queryClient.prefetchQuery(contentPoolQueryOptions(lang, type)),
    ),
  );

  return dehydrate(queryClient);
}
