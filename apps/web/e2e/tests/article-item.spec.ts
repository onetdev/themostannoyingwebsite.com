import { expect, test } from '@playwright/test';

import { getArticlePage } from '../pages/ArticlePage';
import { getHomePage } from '../pages/HomePage';
import { setupE2eTestState } from '../utils/setup';

test(
  'article can be view from the home page',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    const homePage = getHomePage(page);
    await homePage.goto();

    await homePage.coverArticle.locator('a').click();

    await expect(page).toHaveURL(/\/en\/articles\/.*/, { timeout: 2000 });

    const articlePage = getArticlePage(page);
    await expect(articlePage.articleItem).toBeVisible();
    await expect(articlePage.articleItemContent).toBeVisible();
    await expect(articlePage.paywallOverlayConfirm).toBeVisible();
    await expect(articlePage.paywallOverlayCancel).toBeVisible();
  },
);
