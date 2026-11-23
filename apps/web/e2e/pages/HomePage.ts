import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getHomePage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    coverArticle: page.getByTestId('cover-article'),
    denseArticleList: page.getByTestId('dense-article-list'),
    smallCoverArticleList: page.getByTestId('small-cover-article-list'),
    articlesArchiveLink: page.getByTestId('articles-archive-link'),
    shortsSection: page.getByTestId('home-shorts'),
    shortsArchiveLink: page.getByTestId('shorts-archive-link'),
    shortItems: page.getByTestId('home-shorts').getByTestId('short-card'),

    goto: async () => {
      await page.goto('/en');
    },
  };
};
