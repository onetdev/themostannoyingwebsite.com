import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getArticlesPage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    headline: page.getByRole('heading', { level: 1, name: 'Articles' }),
    articleList: page.getByTestId('articles-list'),
    articleItems: page.getByTestId('articles-list-item'),
    pageInfo: page.getByTestId('articles-page-info'),
    pagination: page.getByTestId('pagination'),
    currentPage: page.getByTestId('pagination-current'),
    pageLinks: page.getByTestId('pagination-page'),
    previousPage: page.getByTestId('pagination-previous'),
    nextPage: page.getByTestId('pagination-next'),

    goto: async () => {
      await page.goto('/en/articles');
    },
  };
};
