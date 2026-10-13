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
    noResults: page.getByText('No results found'),

    goto: async () => {
      await page.goto('/en/search');
    },

    search: async (query: string) => {
      await main.getByPlaceholder('Search...').fill(query);
      await main.getByRole('button', { name: 'Search' }).click();
    },
  };
};
