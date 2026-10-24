import { expect, type Page, test } from '@playwright/test';

import { getHomePage } from '../pages/HomePage';
import { setupE2eTestState } from '../utils/setup';

const SYSTEM_OPTION = 'System (auto)';

const chooseTheme = async (page: Page, option: string) => {
  await page.getByTestId('theme-select').click();
  await page.getByRole('option', { name: option }).click();
};

const storedTheme = (page: Page) =>
  page.evaluate(() => window.localStorage.getItem('theme'));

test.describe('theme preference', () => {
  test.use({ colorScheme: 'dark' });

  test.beforeEach(async ({ page }) => {
    await setupE2eTestState(page);
  });

  test('follows the system preference by default', { tag: '@smoke' }, async ({
    page,
  }) => {
    const homePage = getHomePage(page);
    await homePage.goto();
    // Let React hydrate so the provider's `matchMedia` listener is attached
    // before the emulated preference changes.
    await page.waitForLoadState('networkidle');

    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
    await expect(homePage.themeSelect).toHaveAccessibleName(
      'Theme: System (auto)',
    );
    expect(await storedTheme(page)).toBeNull();

    await page.emulateMedia({ colorScheme: 'light' });
    await expect(html).toHaveAttribute('data-theme', 'light');

    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('persists an explicit selection across reloads', async ({ page }) => {
    const homePage = getHomePage(page);
    await homePage.goto();

    await chooseTheme(page, 'Light');

    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');
    await expect(homePage.themeSelect).toHaveAccessibleName('Theme: Light');
    expect(await storedTheme(page)).toBe('light');

    // An explicit selection wins over the OS preference.
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(html).toHaveAttribute('data-theme', 'light');

    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  test('returns to following the system preference', async ({ page }) => {
    const homePage = getHomePage(page);
    await homePage.goto();

    await chooseTheme(page, 'Light');
    await chooseTheme(page, SYSTEM_OPTION);

    const html = page.locator('html');
    expect(await storedTheme(page)).toBe('system');

    await page.emulateMedia({ colorScheme: 'light' });
    await expect(html).toHaveAttribute('data-theme', 'light');

    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });
});
