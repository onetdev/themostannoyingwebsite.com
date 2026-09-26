'use client';

import { arrayShuffle } from '@maw/utils/array';
import { useCallback, useState } from 'react';
import { useVariantPool } from './useVariantPool';

export function useRecommendedSearches() {
  const topSearchesPool = useVariantPool('top-searches');
  const [topSearches, setTopSearches] = useState<string[]>([]);
  const [query, setQuery] = useState('');

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
