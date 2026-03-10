'use client';

import { arrayShuffle } from '@maw/utils/array';
import { useMessages } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

export function useRecommendedSearches() {
  const messages = useMessages() as AppTranslationShape;
  const [topSearches, setTopSearches] = useState<string[]>([]);
  const [query, setQuery] = useState('');

  const topSearchesPool = useMemo(
    () => Object.values(messages.content.search.topSearchVariants),
    [messages.content.search.topSearchVariants],
  );

  const refresh = useCallback(
    (newQuery: string) => {
      setTopSearches(arrayShuffle(topSearchesPool).slice(0, 3));
      setQuery(newQuery);
    },
    [topSearchesPool],
  );

  return {
    query,
    topSearches,
    refresh,
  };
}
