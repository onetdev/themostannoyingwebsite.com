import { type Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getSearchPage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

    headline: page.getByRole('heading', { name: 'Search' }),
    searchInput: page.getByPlaceholder('Search...'),

    goto: async () => {
      await page.goto('/en/search');
    },
  };
};
