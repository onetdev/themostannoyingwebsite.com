import type { DehydratedState } from '@tanstack/react-query';

/**
 * Timestamp written into every dehydrated query instead of the render time.
 *
 * `dehydrate()` stamps each query with `dehydratedAt: Date.now()` and keeps the
 * render-time `dataUpdatedAt`, which makes otherwise identical server output
 * differ on every render. Because that output is part of the ISR cache entry,
 * every revalidation looks like a content change to Vercel and is billed as an
 * ISR write. A constant keeps the serialized payload stable.
 *
 * Safe for the content pools because they are always prefetched (never
 * dehydrated as pending) and their queries use infinite `staleTime`/`gcTime`,
 * so the client never relies on these timestamps for freshness.
 */
const STABLE_TIMESTAMP = 0;

/**
 * Replaces render-time timestamps in a dehydrated React Query state so the
 * serialized payload stays byte-identical across renders.
 */
export function normalizeDehydratedState(
  state: DehydratedState,
): DehydratedState {
  return {
    ...state,
    queries: state.queries.map((query) => ({
      ...query,
      dehydratedAt: STABLE_TIMESTAMP,
      state: {
        ...query.state,
        dataUpdatedAt: STABLE_TIMESTAMP,
      },
    })),
  };
}
