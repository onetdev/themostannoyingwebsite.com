import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';

import DotDotDotText from '@/components/atoms/DotDotDotText';
import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import SearchForm from '@/components/organisms/SearchForm';
import { shuffleArray } from '@/utils/array';
import { makeI18nStaticProps } from '@/utils/i18n';
import { random } from '@/utils/math';

type Result = {
  query: string;
  time: string;
  count: number;
  recommended: string[];
};

const Search: NextPage = () => {
  const { t } = useTranslation('common');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result | undefined>();

  const topSearchesPool = useMemo(() => {
    return t('search.topSearches', {
      returnObjects: true,
      defaultValue: [],
    }) as string[];
  }, [t]);

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

    const time = random(0.001, 5);
    const timer = setTimeout(() => {
      const recommended = shuffleArray(topSearchesPool).slice(0, 3);

      setResults({
        query,
        time: time.toString().substring(0, 6),
        count: 0,
        recommended,
      });
      setLoading(false);
    }, time * 1000);

    return () => clearTimeout(timer);
  }, [query, topSearchesPool]);

  return (
    <main>
      <SiteTitle>{t('navigation.search')}</SiteTitle>
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
      {!loading && results && results.count < 1 && (
        <>
          <div className="my-10 text-2xl font-bold">
            ❌ {t('search.noResults')}
          </div>
          {results.recommended.length > 0 && (
            <div className="my-4 text-base">
              <p>{t('search.peopleAlsoSearched')}</p>
              <ul className="list-inside list-disc pl-5">
                {results.recommended.map((item) => (
                  <li key={item}>
                    <span
                      onClick={() => onRecommendedClick(item)}
                      className="cursor-pointer text-primary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Search;
