'use client';

import type {
  GetSearchResultListQueryParams,
  SearchResultItem,
} from '@maw/content-sdk';
import { randomNumber } from '@maw/utils/random';
import { useInfiniteQuery } from '@tanstack/react-query';
import { createAppContentClient } from '@/core/content';
import { usePainPreferencesStore } from '@/stores';

export const SEARCH_PAGE_SIZE = 10;

export interface SearchPageResult {
  items: SearchResultItem[];
  total: number;
  duration: number;
}

export type SearchQueryParams = Omit<
  GetSearchResultListQueryParams,
  'limit' | 'offset'
>;

const contentClient = createAppContentClient();

export function useSearchQuery(params: SearchQueryParams) {
  const delayEnabled = usePainPreferencesStore(
    (state) => state.flags.searchDelay,
  );

  return useInfiniteQuery<SearchPageResult, Error>({
    queryKey: ['search', params],
    queryFn: async ({ pageParam }) => {
      const start = performance.now();
      const delaySeconds = delayEnabled ? randomNumber(1, 15) : 0;
      if (delaySeconds > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, delaySeconds * 1000),
        );
      }

      const response = await contentClient.search.query({
        ...params,
        limit: SEARCH_PAGE_SIZE,
        offset: typeof pageParam === 'number' ? pageParam : 0,
      });

      return {
        items: response.items,
        total: response.total,
        duration: performance.now() - start,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce(
        (count, page) => count + page.items.length,
        0,
      );

      return loaded < lastPage.total ? loaded : undefined;
    },
    enabled: !!params.q,
  });
}
