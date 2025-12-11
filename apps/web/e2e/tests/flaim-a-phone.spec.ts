import { test } from '@playwright/test';

import { setupE2eTestState } from '../utils/setup';

test('flaim a phone page loads', { tag: '@smoke' }, async ({ page }) => {
  await setupE2eTestState(page);
  await page.goto('/en/flaim-a-phone');
});

// TODO: Add test for testing the quiz
