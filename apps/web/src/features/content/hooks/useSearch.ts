'use client';

import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { useSearchQuery } from '@/features/content/hooks';
import { useEvent } from '@/hooks';

export function useSearch() {
  const locale = useLocale();
  const [query, setQuery] = useState('');

  const {
    data,
    isLoading,
    isFetched: isReady,
  } = useSearchQuery({
    params: {
      query,
      locale,
    },
  });

  useEvent('global-search:query', (event) => {
    setQuery(event.query ?? '');
  });

  const onRecommendedClick = (query: string) => {
    if (typeof window !== 'undefined') {
      window.location.hash = `query=${query}`;
    }
    setQuery(query);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(
        window.location.hash?.replace(/^#/, ''),
      );
      setQuery(queryParams.get('query') ?? '');
    }
  }, []);

  return {
    query,
    data,
    isLoading,
    isReady,
    onRecommendedClick,
  };
}
