import { test } from '@playwright/test';

test('virgin page loads', { tag: '@smoke' }, async ({ page }) => {
  await page.goto('/en/virgin');
});

// TODO: Add tests for checking if all the experiments are truly off
