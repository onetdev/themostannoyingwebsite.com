import type { LanguageCode } from '@maw/content-sdk';
import { HydrationBoundary } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { prefetchContentPools } from '../services/prefetch-content-pools';
import type { ContentPoolType } from '../types';

export interface ContentPoolsBoundaryProps {
  lang: LanguageCode;
  types: readonly ContentPoolType[];
}

/**
 * Server component that prefetches the given Content API resources and
 * hydrates them into the client React Query cache. Wrap only the subtree that
 * actually needs the pools so each route ships the minimum payload.
 */
export async function ContentPoolsBoundary({
  lang,
  types,
  children,
}: PropsWithChildren<ContentPoolsBoundaryProps>) {
  const state = await prefetchContentPools(lang, types);

  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
