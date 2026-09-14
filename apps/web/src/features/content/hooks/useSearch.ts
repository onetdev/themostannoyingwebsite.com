'use client';

import type { LanguageCode } from '@maw/content-sdk';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { useEvent } from '@/core/react';
import { useSearchQuery } from '@/features/content/hooks';

export function useSearch() {
  const locale = useLocale();
  const [query, setQuery] = useState('');

  const {
    data,
    isLoading,
    isError,
    error,
    isFetched: isReady,
  } = useSearchQuery({
    q: query,
    lang: locale as LanguageCode,
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
    isError,
    error,
    isReady,
    onRecommendedClick,
  };
}
