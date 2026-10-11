import { expect, test } from '@playwright/test';

import { allDisabledPainPreferencesState } from '../fixtures/pain-preferences';
import { getArticlePage } from '../pages/ArticlePage';
import { getHomePage } from '../pages/HomePage';
import { setupE2eTestState } from '../utils/setup';
import { setPainPreferences } from '../utils/zustand';

test('article can be view from the home page', { tag: '@smoke' }, async ({
  page,
}) => {
  await setupE2eTestState(page);
  // The default e2e state turns every annoyance off; the content paywall is
  // what this test exercises, so switch it back on.
  await setPainPreferences(page, {
    ...allDisabledPainPreferencesState,
    flags: {
      ...allDisabledPainPreferencesState.flags,
      contentPaywall: true,
    },
  });

  const homePage = getHomePage(page);
  await homePage.goto();

  await homePage.coverArticle.locator('a').click();

  await expect(page).toHaveURL(/\/en\/articles\/.*/, { timeout: 2000 });

  const articlePage = getArticlePage(page);
  await expect(articlePage.articleItem).toBeVisible();
  await expect(articlePage.articleItemContent).toBeVisible();
  await expect(page.getByRole('button', { name: 'Share' })).toBeVisible();
  await expect(articlePage.paywallOverlayConfirm).toBeVisible();
  await expect(articlePage.paywallOverlayCancel).toBeVisible();

  // The locked content fades only across its last 150px (bottom-anchored alpha
  // mask) instead of the whole bottom 45%.
  const maskImage = await articlePage.paywallMaskedContent.evaluate(
    (element) => getComputedStyle(element).maskImage,
  );
  expect(maskImage).toContain('calc(100% - 150px)');
  expect(maskImage).not.toContain('45%');
});
