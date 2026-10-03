'use client';

import type { LanguageCode } from '@maw/content-sdk';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { contentPoolQueryOptions } from '../services/content-pool-query';
import type { ContentPoolItem, ContentPoolType } from '../types';

/**
 * Reads a Content API resource from the hydrated React Query cache.
 *
 * The pool must have been prefetched on the server (see
 * `prefetchContentPools` / `ContentPoolsBoundary`); the query never runs in
 * the browser. The item type is inferred from the pool type. Falls back to an
 * empty array so consumers can degrade gracefully when a pool is unavailable.
 */
export function usePool<T extends ContentPoolType>(
  type: T,
): ContentPoolItem<T>[] {
  const locale = useLocale() as LanguageCode;
  const { data } = useQuery(contentPoolQueryOptions(locale, type));

  return data ?? EMPTY_POOL;
}

const EMPTY_POOL: never[] = [];
