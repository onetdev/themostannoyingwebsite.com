import { test } from '@playwright/test';

import { getFlaimAPhonePage } from '../pages/FlaimAPhonePage';
import { setupE2eTestState } from '../utils/setup';

test('flaim a phone page loads', { tag: '@smoke' }, async ({ page }) => {
  await setupE2eTestState(page);
  const flaimAPhonePage = getFlaimAPhonePage(page);
  await flaimAPhonePage.goto();
});

// TODO: Add test for testing the quiz
