import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getHomePage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    coverArticle: page.getByTestId('cover-article'),
    denseArticleList: page.getByTestId('dense-article-list'),
    smallCoverArticleList: page.getByTestId('small-cover-article-list'),

    goto: async () => {
      await page.goto('/en');
    },
  };
};
