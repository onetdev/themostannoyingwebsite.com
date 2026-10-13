import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getAuthorPage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    authorItem: page.getByTestId('author-item'),
    headline: page
      .getByTestId('author-item')
      .getByRole('heading', { level: 1 }),
    persona: page.getByTestId('author-persona'),
    about: page.getByTestId('author-about'),
    articleList: page.getByTestId('author-article-list'),
    articleItems: page.getByTestId('author-article-item'),
  };
};
