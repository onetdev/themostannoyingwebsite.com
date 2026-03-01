import { expect, test } from '@playwright/test';
import { allDisabledPainPreferencesState } from '../fixtures/pain-preferences';
import { getHomePage } from '../pages/HomePage';
import { setupE2eTestState } from '../utils/setup';
import { setAchievements, setPainPreferences } from '../utils/zustand';

test.describe('Achievements', () => {
  test.beforeEach(async ({ page }) => {
    await setupE2eTestState(page);

    await setPainPreferences(page, {
      ...allDisabledPainPreferencesState,
      flags: {
        ...allDisabledPainPreferencesState.flags,
        achievementNotifications: true,
        deadPixel: true,
        wheelOfFortune: true,
        clipboardMarker: true,
        exitPrompt: true,
        disableContextMenu: true,
      },
    });

    await setAchievements(page, {
      achievements: {
        'first-visit': {
          id: 'first-visit',
          achieved: true,
          progress: 1,
          completedAt: Date.now(),
          updatedAt: Date.now(),
        },
      },
    });
  });

  test(
    'unlocks "Welcome to Hell" on first visit',
    { tag: '@smoke' },
    async ({ page }) => {
      await setAchievements(page, { achievements: {} });
      const homePage = getHomePage(page);
      await homePage.goto();

      const toast = page.locator('button', {
        hasText: 'Achievement Unlocked!',
      });
      await expect(toast).toBeVisible();
      await expect(toast).toContainText('Welcome to Hell');
    },
  );

  test(
    'progresses "Copy-Paste Criminal" on copy',
    { tag: '@smoke' },
    async ({ page }) => {
      const homePage = getHomePage(page);
      await homePage.goto();

      await page.waitForFunction(() => window.maw?._emit !== undefined);

      await page.evaluate(async () => {
        for (let i = 0; i < 5; i++) {
          window.maw?._emit?.('global-text:copied');
        }
      });

      const toast = page.locator('button', {
        hasText: 'Achievement Unlocked!',
      });
      await expect(toast).toBeVisible();
      await expect(toast).toContainText('Copy-Paste Criminal');
    },
  );

  test('unlocks "The Seeker" on search', async ({ page }) => {
    const homePage = getHomePage(page);
    await homePage.goto();

    const searchInput = page.getByPlaceholder('Search');
    await searchInput.fill('something');
    await searchInput.press('Enter');

    const toast = page.locator('button', { hasText: 'Achievement Unlocked!' });
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('The Seeker');
  });

  test('unlocks "Financial Commitment" on package selection', async ({
    page,
  }) => {
    await page.goto('/plans');
    await page.getByRole('button', { name: 'Select' }).first().waitFor();
    await page.getByRole('button', { name: 'Select' }).first().click();

    const toast = page.locator('button', { hasText: 'Achievement Unlocked!' });
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Financial Commitment');
  });

  test('unlocks "Dead Pixel Hunter" on dead pixel click', async ({ page }) => {
    await page.goto('/');

    const deadPixel = page.locator('[data-testid="dead-pixel"]').first();
    // It might take a bit to appear due to useEffect and hydration
    await expect(deadPixel).toBeVisible({ timeout: 15000 });
    await deadPixel.click({ force: true });

    const toast = page.locator('button', { hasText: 'Achievement Unlocked!' });
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Dead Pixel Hunter');
  });

  test('unlocks "Right-Click Rebel" after 20 right clicks', async ({
    page,
  }) => {
    await page.goto('/');

    await page.waitForFunction(() => window.maw?._emit !== undefined);

    await page.evaluate(() => {
      for (let i = 0; i < 20; i++) {
        window.maw?._emit?.('context-menu:triggered');
      }
    });

    const toast = page.locator('button', { hasText: 'Achievement Unlocked!' });
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Right-Click Rebel');
  });

  test('unlocks "The System Admin" on admin login', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('text=login:')).toBeVisible({ timeout: 15000 });
    await page.keyboard.type('admin', { delay: 50 });
    await page.keyboard.press('Enter');
    await expect(page.locator('text=password:')).toBeVisible();
    await page.keyboard.type('admin', { delay: 50 });
    await page.keyboard.press('Enter');

    const toast = page.locator('button', { hasText: 'Achievement Unlocked!' });
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('The System Admin');
  });

  test('unlocks "Optimistic Gambler" on wheel spin', async ({ page }) => {
    await page.goto('/');

    const wheelTrigger = page.getByLabel('Wheel of fortune');
    await expect(wheelTrigger).toBeVisible({ timeout: 10000 });
    await wheelTrigger.click();

    const spinButton = page.getByRole('button', { name: 'Click or Tap here!' });
    await expect(spinButton).toBeVisible();
    await spinButton.click();

    const toast = page.locator('button', { hasText: 'Achievement Unlocked!' });
    await expect(toast).toBeVisible({ timeout: 20000 });
    await expect(toast).toContainText('Optimistic Gambler');
  });

  test('unlocks "Escape Artist" on exit prompt', async ({ page }) => {
    await page.goto('/');

    await page.waitForFunction(() => window.maw?._emit !== undefined);

    await page.evaluate(() => {
      window.maw?._emit?.('exit-prompt:shown');
    });

    const toast = page.locator('button', { hasText: 'Achievement Unlocked!' });
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Escape Artist');
  });

  test('unlocks "Lost Forever" after 500 maze steps', async ({ page }) => {
    await page.goto('/');

    await page.waitForFunction(() => window.maw?._emit !== undefined);

    await page.evaluate(() => {
      for (let i = 0; i < 500; i++) {
        window.maw?._emit?.('screensaver:maze:stepped', {
          passedSpecialCell: false,
        });
      }
    });

    const toast = page.locator('button', { hasText: 'Achievement Unlocked!' });
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Lost Forever');
  });

  test('unlocks "Bouncing Logo Fanatic" after 420 bounces', async ({
    page,
  }) => {
    await page.goto('/');

    await page.waitForFunction(() => window.maw?._emit !== undefined);

    await page.evaluate(() => {
      for (let i = 0; i < 420; i++) {
        window.maw?._emit?.('screensaver:bouncy-logo:bounced', {
          isPerfectCorner: false,
        });
      }
    });

    const toast = page.locator('button', { hasText: 'Achievement Unlocked!' });
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Bouncing Logo Fanatic');
  });
});
