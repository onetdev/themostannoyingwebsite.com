import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getSearchPage = (page: Page) => {
  const shared = getSharedLocators(page);
  const main = page.getByRole('main');

  return {
    ...shared,

    headline: page.getByRole('heading', { name: 'Search' }),
    searchInput: main.getByPlaceholder('Search...'),
    searchButton: main.getByRole('button', { name: 'Search' }),
    emptyState: page.getByTestId('search-empty-state'),
    loadingMessages: page.getByTestId('loading-messages'),
    loadingIcon: page.locator('[data-testid="loading-messages"] svg').first(),
    loadingText: page.locator(
      '[data-testid="loading-messages"] [data-slot="marker-content"]',
    ),
    skeleton: page.getByTestId('search-results-skeleton'),
    resultMeta: page.getByText(/took \d+ms and found \d+ results/),
    resultItems: page.getByTestId('search-result-item'),
    articleResults: page.locator(
      '[data-testid="search-result-item"][data-type="article"]',
    ),
    shortResults: page.locator(
      '[data-testid="search-result-item"][data-type="short-video"]',
    ),
    pageResults: page.locator(
      '[data-testid="search-result-item"][data-type="page"]',
    ),
    filterAll: page.getByRole('button', { name: 'All', exact: true }),
    filterArticles: page.getByRole('button', { name: 'Articles', exact: true }),
    filterShorts: page.getByRole('button', { name: 'Shorts', exact: true }),
    filterPages: page.getByRole('button', { name: 'Pages', exact: true }),
    loadMore: page.getByTestId('search-load-more'),
    noResults: page.getByText('No results found'),
    errorAlert: main.getByRole('alert').filter({ hasText: 'Search failed' }),

    goto: async () => {
      await page.goto('/en/search');
    },

    search: async (query: string) => {
      await main.getByPlaceholder('Search...').fill(query);
      await main.getByRole('button', { name: 'Search' }).click();
    },
  };
};
