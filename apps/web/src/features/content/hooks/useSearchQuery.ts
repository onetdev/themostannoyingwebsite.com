'use client';

import type {
  GetSearchResultsQueryParams,
  SearchResultItem,
} from '@maw/content-sdk';
import { randomNumber } from '@maw/utils/random';
import { useQuery } from '@tanstack/react-query';
import { createAppContentClient } from '@/core/content';
import { usePainPreferencesStore } from '@/stores';

type SearchResult = {
  items: SearchResultItem[];
  duration: number;
};

const contentClient = createAppContentClient();

export function useSearchQuery(params: GetSearchResultsQueryParams) {
  const delayEnabled = usePainPreferencesStore(
    (state) => state.flags.searchDelay,
  );

  return useQuery<SearchResult, Error>({
    queryKey: ['articles', 'search', params],
    queryFn: async () => {
      const start = performance.now();
      const delaySeconds = delayEnabled ? randomNumber(1, 15) : 0;
      if (delaySeconds > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, delaySeconds * 1000),
        );
      }

      const response = await contentClient.search.query({
        ...params,
        type: 'article',
      });

      const duration = performance.now() - start;

      return {
        items: response.items,
        duration,
      };
    },
    enabled: !!params.q,
  });
}
