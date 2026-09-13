'use client';

import {
  createContentClient,
  createSearchSnippet,
  type LanguageCode,
} from '@maw/content-sdk';
import { randomNumber } from '@maw/utils/random';
import { useQuery } from '@tanstack/react-query';
import { usePainPreferencesStore } from '@/stores';
import type { ArticleSearchQuery, ArticleSearchResult } from '../types';

type SearchResult = {
  items: ArticleSearchResult[];
  duration: number;
};

const contentClient = createContentClient();

export function useSearchQuery(query: ArticleSearchQuery) {
  const delayEnabled = usePainPreferencesStore(
    (state) => state.flags.searchDelay,
  );

  return useQuery<SearchResult, Error>({
    queryKey: ['articles', 'search', query],
    queryFn: async () => {
      const start = performance.now();
      const delaySeconds = delayEnabled ? randomNumber(1, 15) : 0;
      if (delaySeconds > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, delaySeconds * 1000),
        );
      }

      const response = await contentClient.articles.list({
        q: query.params.query,
        lang: query.params.locale as LanguageCode,
        limit: query.paginate?.take ?? 20,
        offset: query.paginate?.skip ?? 0,
      });

      const duration = performance.now() - start;

      const items: ArticleSearchResult[] = response.items.map((item) => ({
        lookup: {
          slug: item.slug,
          locale: item.lang,
        },
        title: item.title,
        contextHighlight: createSearchSnippet(item.content, query.params.query),
      }));

      return {
        items,
        duration,
      };
    },
    enabled: !!query.params.query,
  });
}
