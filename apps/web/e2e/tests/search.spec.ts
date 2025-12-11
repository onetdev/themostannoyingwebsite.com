import { test } from '@playwright/test';

import { setupE2eTestState } from '../utils/setup';

test('search page loads', { tag: '@smoke' }, async ({ page }) => {
  await setupE2eTestState(page);
  await page.goto('/en/search');
});

// TODO: Add test from coming from the menu and also perfoming actual search
