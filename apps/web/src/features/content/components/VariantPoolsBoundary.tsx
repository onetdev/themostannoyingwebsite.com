import type { LanguageCode, VariantPoolType } from '@maw/content-sdk';
import { HydrationBoundary } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { prefetchVariantPools } from '../services/prefetch-variant-pools';

export interface VariantPoolsBoundaryProps {
  lang: LanguageCode;
  types: readonly VariantPoolType[];
}

/**
 * Server component that prefetches the given Content API variant pools and
 * hydrates them into the client React Query cache. Wrap only the subtree that
 * actually needs the pools so each route ships the minimum payload.
 */
export async function VariantPoolsBoundary({
  lang,
  types,
  children,
}: PropsWithChildren<VariantPoolsBoundaryProps>) {
  const state = await prefetchVariantPools(lang, types);

  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
