import { expect, test } from '@playwright/test';

test(
  'opening the domain should redirect to /en',
  { tag: '@smoke' },
  async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/en/');
    await expect(page).toHaveTitle(/The Most Annoying Website/);
  },
);

test(
  'layout elements should be present',
  { tag: '@smoke' },
  async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('search')).toBeVisible();

    const footer = page.getByRole('contentinfo');
    await expect(footer).toBeVisible();
  },
);
