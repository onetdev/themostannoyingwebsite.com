import { test } from '@playwright/test';

import { getSearchPage } from '../pages/SearchPage';
import { setupE2eTestState } from '../utils/setup';

test('search page loads', { tag: '@smoke' }, async ({ page }) => {
  await setupE2eTestState(page);
  const searchPage = getSearchPage(page);
  await searchPage.goto();
});

// TODO: Add test from coming from the menu and also perfoming actual search
