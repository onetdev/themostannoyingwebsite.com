import type { Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getArticlePage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

    articleItem: page.getByTestId('article-item'),
    articleItemContent: page.getByTestId('article-item-content'),
    paywallOverlayConfirm: page.getByTestId('paywall-overlay-confirm'),
    paywallOverlayCancel: page.getByTestId('paywall-overlay-cancel'),
  };
};
