import { expect, test } from '@playwright/test';

import { getHomePage } from '../pages/HomePage';
import { setupE2eTestState } from '../utils/setup';

test(
  'dark mode toggle switches themes',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    const homePage = getHomePage(page);
    await homePage.goto();

    // Initial state: should be dark mode by default (or whatever `next-themes` sets)
    // Check the html element for the 'dark' attribute
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // Click to toggle to dark mode
    await homePage.darkModeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'light');

    // Click to toggle back to light mode
    await homePage.darkModeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
  },
);
