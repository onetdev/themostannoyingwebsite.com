'use client';

import type { ArticleSearchQuery, ArticleSearchResult } from '@maw/content-api';
import { randomNumber } from '@maw/utils/random';
import { useQuery } from '@tanstack/react-query';
import { useAppConfigContext } from '@/core/config/react/AppConfig';
import { useHttpClient } from '@/core/http';
import { QueryError } from '@/core/http/react/QueryError';
import { usePainPreferencesStore } from '@/stores';

type SearchResult = {
  items: ArticleSearchResult[];
  duration: number;
};

export function useSearchQuery(query: ArticleSearchQuery) {
  const config = useAppConfigContext();
  const httpClient = useHttpClient();
  const delayEnabled = usePainPreferencesStore(
    (state) => state.flags.searchDelay,
  );

  return useQuery<SearchResult, QueryError>({
    queryKey: ['articles', 'search', query],
    queryFn: async () => {
      const start = performance.now();
      const delaySeconds = delayEnabled ? randomNumber(1, 15) : 0;
      await new Promise((resolve) => setTimeout(resolve, delaySeconds * 1000));

      const result = await httpClient.get<ArticleSearchResult[]>(
        config.content.api.searchEndpoint,
        {
          params: {
            query: query.params.query,
            locale: query.params.locale,
            take: query.paginate?.take,
            skip: query.paginate?.skip,
          },
        },
      );

      // We need to throw for QueryClient to properly catch status.
      if (!result.success) {
        throw new QueryError(result.error.message, result);
      }

      const duration = performance.now() - start;
      return {
        items: result.data || [],
        duration,
      };
    },
    enabled: !!query.params.query,
  });
}
