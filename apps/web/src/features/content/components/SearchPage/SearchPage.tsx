'use client';

import {
  Alert,
  AlertDescription,
  Button,
  PageHeadline,
  ToggleGroup,
  ToggleGroupItem,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import {
  isSearchFilter,
  SEARCH_FILTERS,
  type SearchFilter,
  useSearch,
} from '@/features/content/hooks';
import { ShareButton } from '@/features/share/components';
import { usePainPreferencesStore } from '@/stores';
import { SearchForm } from '../SearchForm';
import { NoSearchResults } from './NoSearchResults';
import { SearchEmptyState } from './SearchEmptyState';
import { SearchLoadingState } from './SearchLoadingState';
import { SearchResultItem } from './SearchResultItem';

type SearchState = ReturnType<typeof useSearch>;

interface SearchResultsProps {
  search: SearchState;
  searchDelayEnabled: boolean;
}

function SearchResultsStatus({
  search,
  searchDelayEnabled,
}: SearchResultsProps) {
  const t = useTranslations('content.search');
  const { query, data, isLoading, isError } = search;
  const hasQuery = query.trim().length > 0;
  const showLoadingState = !isError && isLoading;
  const showResultMeta = !isError && !isLoading && hasQuery && !!data;

  return (
    <>
      {isError && (
        <Alert variant="destructive" className="my-4">
          <AlertDescription>{t('error')}</AlertDescription>
        </Alert>
      )}
      {showLoadingState && (
        <SearchLoadingState showSkeleton={searchDelayEnabled} />
      )}
      {showResultMeta && (
        <div className="my-4 text-sm">
          {t('resultMeta', {
            query,
            count: data.total,
            time: data.duration?.toFixed(0) ?? '0',
          })}
        </div>
      )}
    </>
  );
}

function SearchResultsList({ search }: { search: SearchState }) {
  const t = useTranslations('content.search');
  const {
    query,
    data,
    isLoading,
    isError,
    isReady,
    hasMore,
    isFetchingNextPage,
    loadMore,
    onRecommendedClick,
  } = search;
  const hasQuery = query.trim().length > 0;
  const hasResults = Boolean(data?.items.length);
  const isSettled = !isError && !isLoading;
  const showResults = isSettled && hasResults;
  const showLoadMore = showResults && hasMore;
  const showEmptyState = isSettled && !hasQuery;
  const showNoResults = isSettled && hasQuery && !hasResults && isReady;

  return (
    <>
      {showResults &&
        data?.items.map((item) => (
          <SearchResultItem key={item.id} item={item} />
        ))}
      {showLoadMore && (
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={loadMore}
            disabled={isFetchingNextPage}
            data-testid="search-load-more"
            data-track="search:load-more"
          >
            {isFetchingNextPage ? t('loadingMore') : t('loadMore')}
          </Button>
        </div>
      )}
      {showEmptyState && <SearchEmptyState />}
      {showNoResults && <NoSearchResults onClick={onRecommendedClick} />}
    </>
  );
}

function SearchResults(props: SearchResultsProps) {
  return (
    <>
      <SearchResultsStatus {...props} />
      <SearchResultsList search={props.search} />
    </>
  );
}

export function SearchPage() {
  const t = useTranslations('content.search');
  const tNavigation = useTranslations('common.navigation');
  const search = useSearch();
  const { type, setType } = search;
  const searchDelayEnabled = usePainPreferencesStore(
    (state) => state.flags.searchDelay,
  );
  const filterLabels: Record<SearchFilter, string> = {
    all: t('filters.all'),
    article: t('filters.article'),
    short: t('filters.short'),
    page: t('filters.page'),
  };

  return (
    <div
      className="mx-auto w-full max-w-4xl"
      data-track-section="content:search"
    >
      <PageHeadline actions={<ShareButton section="content:search" />}>
        {tNavigation('search')}
      </PageHeadline>
      <SearchForm size="lg" className="w-full" initialValue={search.query} />
      <ToggleGroup
        value={[type]}
        onValueChange={(values) => {
          const next = values[0];

          if (isSearchFilter(next)) {
            setType(next);
          }
        }}
        variant="outline"
        size="sm"
        aria-label={t('filters.label')}
        className="mt-6 flex-wrap"
      >
        {SEARCH_FILTERS.map((filter) => (
          <ToggleGroupItem
            key={filter}
            value={filter}
            className="rounded-full px-3"
            data-track="search:filter"
            data-track-key={filter}
          >
            {filterLabels[filter]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="mt-6">
        <SearchResults
          search={search}
          searchDelayEnabled={searchDelayEnabled}
        />
      </div>
    </div>
  );
}
