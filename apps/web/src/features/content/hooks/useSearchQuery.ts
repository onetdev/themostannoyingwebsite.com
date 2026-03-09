'use client';

import type { ArticleSearchQuery, ArticleSearchResult } from '@maw/content-api';
import { randomNumber } from '@maw/utils/random';
import { useQuery } from '@tanstack/react-query';
import { useAppConfigContext } from '@/core/config/react-app-config';
import { usePainPreferencesStore } from '@/stores';

type SearchResult = {
  items: ArticleSearchResult[];
  duration: number;
};

export function useSearchQuery(query: ArticleSearchQuery) {
  const config = useAppConfigContext();
  const delayEnabled = usePainPreferencesStore(
    (state) => state.flags.searchDelay,
  );

  return useQuery<SearchResult>({
    queryKey: ['articles', 'search', query],
    queryFn: async () => {
      const start = performance.now();
      const delaySeconds = delayEnabled ? randomNumber(1, 15) : 0;
      await new Promise((resolve) => setTimeout(resolve, delaySeconds * 1000));

      const url = new URL(
        config.content.api.searchEndpoint,
        window.location.origin,
      );

      if (query.params.query) {
        url.searchParams.append('query', query.params.query);
      }

      if (query.params.locale) {
        url.searchParams.append('locale', query.params.locale);
      }

      if (query.paginate?.take) {
        url.searchParams.append('take', query.paginate.take.toString());
      }

      if (query.paginate?.skip) {
        url.searchParams.append('skip', query.paginate.skip.toString());
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const duration = performance.now() - start;
      return response.json().then((items) => ({ items, duration }));
    },
    enabled: !!query.params.query,
  });
}
