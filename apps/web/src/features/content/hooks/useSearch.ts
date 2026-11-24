'use client';

import type {
  GetSearchResultListQueryParams,
  LanguageCode,
} from '@maw/content-sdk';
import { useLocale } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { useEvent } from '@/core/react';
import { useSearchQuery } from '@/features/content/hooks';

export type SearchFilter =
  | 'all'
  | NonNullable<GetSearchResultListQueryParams['type']>;

export const SEARCH_FILTERS: readonly SearchFilter[] = [
  'all',
  'article',
  'short-video',
  'page',
];

interface SearchState {
  query: string;
  type: SearchFilter;
}

export const isSearchFilter = (value: unknown): value is SearchFilter =>
  typeof value === 'string' &&
  (SEARCH_FILTERS as readonly string[]).includes(value);

/**
 * Maps the pre-rename `type=short` search links to the API's `short-video`
 * discriminator so bookmarks and shared URLs keep working.
 */
const normalizeSearchFilter = (value: unknown): SearchFilter => {
  if (value === 'short') {
    return 'short-video';
  }

  return isSearchFilter(value) ? value : 'all';
};

const buildSearchUrl = ({ query, type }: SearchState): string => {
  const params = new URLSearchParams();

  if (query) {
    params.set('q', query);
  }

  if (type !== 'all') {
    params.set('type', type);
  }

  const search = params.toString();

  return `${window.location.pathname}${search ? `?${search}` : ''}`;
};

const readSearchState = (): SearchState => {
  if (typeof window === 'undefined') {
    return { query: '', type: 'all' };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(
    window.location.hash?.replace(/^#/, ''),
  );
  const rawType = searchParams.get('type');

  return {
    // `?q=` is the canonical form (also used by the SearchAction); the
    // `#query=` fragment stays supported for older links.
    query: searchParams.get('q') ?? hashParams.get('query') ?? '',
    type: normalizeSearchFilter(rawType),
  };
};

export function useSearch() {
  const locale = useLocale();
  const [search, setSearch] = useState<SearchState>({
    query: '',
    type: 'all',
  });
  const {
    data,
    isLoading,
    isError,
    error,
    isFetched: isReady,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchQuery({
    q: search.query,
    lang: locale as LanguageCode,
    type: search.type === 'all' ? undefined : search.type,
  });

  useEvent('global-search:query', (event) => {
    // A new query starts unfiltered; the URL from the form carries only `q`.
    setSearch({ query: event.query ?? '', type: 'all' });
  });

  const setType = useCallback(
    (type: SearchFilter) => {
      setSearch((current) => ({ ...current, type }));

      if (typeof window !== 'undefined') {
        window.history.replaceState(
          null,
          '',
          buildSearchUrl({ query: search.query, type }),
        );
      }
    },
    [search.query],
  );

  const onRecommendedClick = useCallback((query: string) => {
    setSearch({ query, type: 'all' });

    if (typeof window !== 'undefined') {
      window.history.replaceState(
        null,
        '',
        buildSearchUrl({ query, type: 'all' }),
      );
    }
  }, []);

  useEffect(() => {
    const applyUrl = () => setSearch(readSearchState());

    applyUrl();
    window.addEventListener('popstate', applyUrl);

    return () => window.removeEventListener('popstate', applyUrl);
  }, []);

  const pages = data?.pages ?? [];
  const items = pages.flatMap((page) => page.items);
  const total = pages[0]?.total ?? 0;
  const duration = pages[0]?.duration ?? 0;
  const hasMore = Boolean(hasNextPage);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    query: search.query,
    type: search.type,
    setType,
    data: pages.length > 0 ? { items, total, duration } : undefined,
    isLoading,
    isError,
    error,
    isReady,
    hasMore,
    isFetchingNextPage,
    loadMore,
    onRecommendedClick,
  };
}
