import { expect, test } from '@playwright/test';

import { getHomePage } from '../pages/HomePage';
import { setupE2eTestState } from '../utils/setup';

test(
  'opening the domain should redirect to /en',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    await page.goto('/');
    await expect(page).toHaveURL('/en/');
    await expect(page).toHaveTitle(/The Most Annoying Website/);
  },
);

test(
  'layout elements should be present',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    const homePage = getHomePage(page);
    await homePage.goto();

    await expect(homePage.header).toBeVisible();
    await expect(homePage.searchForm).toBeVisible();
    await expect(homePage.footer).toBeVisible();
  },
);
