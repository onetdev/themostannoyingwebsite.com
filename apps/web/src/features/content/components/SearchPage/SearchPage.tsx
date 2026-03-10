'use client';

import {
  Alert,
  AlertDescription,
  DotDotDotText,
  PageHeadline,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { SearchForm } from '@/features/content/components';
import { useSearch } from '@/features/content/hooks';
import { NoSearchResults } from './NoSearchResults';
import { SearchResultItem } from './SearchResultItem';

export function SearchPage() {
  const t = useTranslations('content.search');
  const tNavigation = useTranslations('navigation');
  const { onRecommendedClick, query, data, isLoading, isError, isReady } =
    useSearch();

  const hasResults = data?.items && data?.items.length > 0;

  return (
    <>
      <PageHeadline>{tNavigation('search')}</PageHeadline>
      <SearchForm size="lg" className="max-w-[400px]" initialValue={query} />
      {isLoading && (
        <h4 className="my-10 text-2xl">
          {t('searching')} <DotDotDotText />
        </h4>
      )}
      {isError && (
        <Alert variant="destructive" className="my-4">
          <AlertDescription>{t('error')}</AlertDescription>
        </Alert>
      )}
      {!isLoading && !isError && data && (
        <div className="my-4 text-sm">
          {t('resultMeta', {
            query,
            count: data.items.length,
            time: data.duration?.toFixed(0) ?? '0',
          })}
        </div>
      )}
      {hasResults &&
        data.items.map((item) => (
          <SearchResultItem key={item.lookup.slug} item={item} />
        ))}
      {!hasResults && !isError && isReady && (
        <NoSearchResults onClick={onRecommendedClick} />
      )}
    </>
  );
}
