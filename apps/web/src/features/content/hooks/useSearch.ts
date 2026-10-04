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
      window.history.replaceState(null, '', `?q=${encodeURIComponent(query)}`);
    }
    setQuery(query);
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const readQueryFromUrl = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(
        window.location.hash?.replace(/^#/, ''),
      );
      // `?q=` is the canonical form (also used by the SearchAction); the
      // `#query=` fragment stays supported for older links.
      return searchParams.get('q') ?? hashParams.get('query') ?? '';
    };

    const handlePopState = () => setQuery(readQueryFromUrl());

    setQuery(readQueryFromUrl());
    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
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
