import type { Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getHomePage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

    coverArticle: page.getByTestId('cover-article'),
    denseArticleList: page.getByTestId('dense-article-list'),
    smallCoverArticleList: page.getByTestId('small-cover-article-list'),

    goto: async () => {
      await page.goto('/en');
    },
  };
};
