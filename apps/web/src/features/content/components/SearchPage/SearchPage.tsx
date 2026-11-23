'use client';

import {
  Alert,
  AlertDescription,
  Button,
  PageHeadline,
  Separator,
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
  const { isLoading, isError } = search;
  const showLoadingState = !isError && isLoading;

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
  const { type, setType, query, data, isLoading, isError } = search;
  const showResultMeta = !isError && !isLoading && !!query.trim() && !!data;
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
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
          className="flex-wrap"
        >
          {SEARCH_FILTERS.map((filter) => (
            <ToggleGroupItem
              key={filter}
              value={filter}
              className="cursor-pointer rounded-full px-3 aria-pressed:bg-primary aria-pressed:text-primary-foreground"
              data-track="search:filter"
              data-track-key={filter}
            >
              {filterLabels[filter]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        {showResultMeta && data && (
          <p className="text-sm text-muted-foreground sm:text-right">
            {t('resultMeta', {
              query,
              count: data.total,
              time: data.duration?.toFixed(0) ?? '0',
            })}
          </p>
        )}
      </div>
      <Separator className="my-4" />
      <SearchResults search={search} searchDelayEnabled={searchDelayEnabled} />
    </div>
  );
}
