import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getArticlePage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    articleItem: page.getByTestId('article-item'),
    articleItemContent: page.getByTestId('article-item-content'),
    paywallOverlayConfirm: page.getByTestId('paywall-overlay-confirm'),
    paywallOverlayCancel: page.getByTestId('paywall-overlay-cancel'),
  };
};
