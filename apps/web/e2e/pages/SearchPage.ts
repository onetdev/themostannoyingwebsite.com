import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getSearchPage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    headline: page.getByRole('heading', { name: 'Search' }),
    searchInput: page.getByPlaceholder('Search...'),

    goto: async () => {
      await page.goto('/en/search');
    },
  };
};
