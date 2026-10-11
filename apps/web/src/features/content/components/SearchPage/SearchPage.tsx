'use client';

import { Alert, AlertDescription, PageHeadline } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useSearch } from '@/features/content/hooks';
import { ShareButton } from '@/features/share/components';
import { usePainPreferencesStore } from '@/stores';
import { SearchForm } from '../SearchForm';
import { NoSearchResults } from './NoSearchResults';
import { SearchEmptyState } from './SearchEmptyState';
import { SearchLoadingState } from './SearchLoadingState';
import { SearchResultItem } from './SearchResultItem';

export function SearchPage() {
  const t = useTranslations('content.search');
  const tNavigation = useTranslations('common.navigation');
  const { onRecommendedClick, query, data, isLoading, isError, isReady } =
    useSearch();
  const searchDelayEnabled = usePainPreferencesStore(
    (state) => state.flags.searchDelay,
  );

  const hasQuery = query.trim().length > 0;
  const hasResults = Boolean(data?.items && data.items.length > 0);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <PageHeadline actions={<ShareButton />}>
        {tNavigation('search')}
      </PageHeadline>
      <SearchForm size="lg" className="w-full" initialValue={query} />
      {isError && (
        <Alert variant="destructive" className="my-4">
          <AlertDescription>{t('error')}</AlertDescription>
        </Alert>
      )}
      {!isError && isLoading && (
        <SearchLoadingState showSkeleton={searchDelayEnabled} />
      )}
      {!isError && !isLoading && hasQuery && data && (
        <div className="my-4 text-sm">
          {t('resultMeta', {
            query,
            count: data.items.length,
            time: data.duration?.toFixed(0) ?? '0',
          })}
        </div>
      )}
      {!isError &&
        hasResults &&
        data?.items.map((item) => (
          <SearchResultItem key={item.slug} item={item} />
        ))}
      {!isError && !isLoading && !hasQuery && <SearchEmptyState />}
      {!isError && !isLoading && hasQuery && !hasResults && isReady && (
        <NoSearchResults onClick={onRecommendedClick} />
      )}
    </div>
  );
}
