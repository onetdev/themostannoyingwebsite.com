'use client';

import { DotDotDotText, PageHeadline } from '@maw/ui-lib';
import { arrayShuffle } from '@maw/utils/array';
import { random } from '@maw/utils/math';
import HTMLReactParser from 'html-react-parser';
import { useLocale, useMessages, useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { SearchForm } from '@/components/AppHeader/SearchForm';
import { Link } from '@/i18n/navigation';
import { usePainPreferencesStore } from '@/kernel';
import { AppArticleService, ArticleSearchResult } from '@/modules/content';

type Result = {
  query: string;
  time: string;
  count: number;
  topSearches: string[];
  items: ArticleSearchResult[];
};

export function SearchPage() {
  const locale = useLocale();
  const messages = useMessages();
  const enabled = usePainPreferencesStore((state) => state.flags.searchDelay);
  const t = useTranslations();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result | undefined>();

  const topSearchesPool = useMemo(() => {
    const items = Object.keys(messages.search.topSearcheVariants).map(
      (key) => t(`search.topSearcheVariants.${key}`) as unknown as string,
    );

    return items;
  }, [messages.search.topSearcheVariants, t]);

  const onSearchEvent = useCallback((event: CustomEvent) => {
    setQuery(event.detail.query);
  }, []);

  const onRecommendedClick = (query: string) => {
    document.location.hash = `query=${query}`;
    setQuery(query);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(
        window.location.hash?.replace(/^#/, ''),
      );
      setQuery(query.get('query') ?? '');
    }

    document.addEventListener('DocumentEventSearch', onSearchEvent);

    return () => {
      document.removeEventListener('DocumentEventSearch', onSearchEvent);
    };
  }, [onSearchEvent]);

  useEffect(() => {
    if (!query) {
      return;
    }

    setResults(undefined);
    setLoading(true);

    const startTime = new Date().getTime();
    const delayTime = enabled ? random(0.001, 5) : 0;
    const timer = setTimeout(async () => {
      const matches = await AppArticleService.search({
        query,
        params: {
          locale,
        },
      });

      const time = (new Date().getTime() - startTime) / 1000 + delayTime;
      setResults({
        query,
        time: time.toString().substring(0, time.toString().indexOf('.') + 6),
        count: matches.length,
        topSearches: arrayShuffle(topSearchesPool).slice(0, 3),
        items: matches,
      });
      setLoading(false);
    }, delayTime * 1000);

    return () => clearTimeout(timer);
  }, [query, enabled, topSearchesPool, locale]);

  const showResultList = !loading && results && results.items.length > 0;

  return (
    <>
      <PageHeadline>{t('navigation.search')}</PageHeadline>
      <SearchForm size="lg" className="max-w-[400px]" initialValue={query} />
      {loading && (
        <h4 className="my-10 text-2xl">
          {t('search.searching')} <DotDotDotText />
        </h4>
      )}
      {results && (
        <div className="my-4 text-sm">
          {t('search.resultMeta', {
            query: results.query,
            count: results.count,
            time: results.time.toString().substring(0, 6),
          })}
        </div>
      )}
      {showResultList && (
        <>
          {results.items.map((item) => (
            <div className="my-4" key={item.lookup.slug}>
              <h4>
                <Link
                  href={`articles/${item.lookup.slug}`}
                  passHref
                  prefetch={false}>
                  {item.title}
                </Link>
              </h4>
              <p className="max-w-screen-md">
                {HTMLReactParser(item.contextHighlight)}
              </p>
            </div>
          ))}
        </>
      )}
      {!loading && results && results.count < 1 && (
        <>
          <div className="my-10 text-2xl font-bold">
            ❌ {t('search.noResults')}
          </div>
          {results.topSearches.length > 0 && (
            <div className="my-4 text-base">
              <p>{t('search.peopleAlsoSearched')}</p>
              <ul className="list-inside list-disc pl-5">
                {results.topSearches.map((item) => (
                  <li key={item}>
                    <span
                      onClick={() => onRecommendedClick(item)}
                      className="text-primary cursor-pointer">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
}
