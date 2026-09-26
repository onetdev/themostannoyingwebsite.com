'use client';

import type { LanguageCode, VariantPoolType } from '@maw/content-sdk';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { variantPoolQueryOptions } from '../services/variant-pool-query';

/**
 * Reads a Content API variant pool from the hydrated React Query cache.
 *
 * The pool must have been prefetched on the server (see
 * `prefetchVariantPools` / `VariantPoolsBoundary`); the query never runs in
 * the browser. Falls back to an empty array so consumers can degrade
 * gracefully when a pool is unavailable.
 */
export function useVariantPool<T>(type: VariantPoolType): T[] {
  const locale = useLocale() as LanguageCode;
  const { data } = useQuery(variantPoolQueryOptions<T>(locale, type));

  return data ?? EMPTY_POOL;
}

const EMPTY_POOL: never[] = [];
