import { expect, test } from '@playwright/test';
import { allDisabledPainPreferencesState } from '../fixtures/pain-preferences';
import { getAchievementsPage } from '../pages/AchievementsPage';
import { getAdminPage } from '../pages/AdminPage';
import { getHomePage } from '../pages/HomePage';
import { getPlansPage } from '../pages/PlansPage';
import { setupE2eTestState } from '../utils/setup';
import { selectText } from '../utils/ui';
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

      const toast = homePage.toast.achievementUnlocked;
      await expect(toast).toBeVisible();
      await expect(toast).toContainText('Welcome to Hell');
    },
  );

  test(
    'progresses "Copy-Paste Criminal" on copy',
    { tag: '@smoke' },
    async ({ page }) => {
      const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';

      const achievementsPage = getAchievementsPage(page);
      await achievementsPage.goto();

      for (let i = 0; i < 6; i++) {
        selectText(achievementsPage.achievementCard.nth(i));
        await page.keyboard.down(modifier);
        await page.keyboard.press('c');
        await page.waitForTimeout(100);
        await page.keyboard.up(modifier);
      }

      const toast = achievementsPage.toast.achievementUnlocked;

      await expect(toast).toBeVisible();
      await expect(toast).toContainText('Copy-Paste Criminal');
    },
  );

  test('unlocks "The Seeker" on search', async ({ page }) => {
    const achievementsPage = getAchievementsPage(page);
    await achievementsPage.goto();

    const searchInput = page.getByPlaceholder('Search');
    await searchInput.fill('something');
    await searchInput.press('Enter');

    const toast = achievementsPage.toast.achievementUnlocked;
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('The Seeker');
  });

  test('unlocks "Financial Commitment" on package selection', async ({
    page,
  }) => {
    const plansPage = getPlansPage(page);
    await plansPage.goto();

    await page.goto('/plans');
    await page.getByRole('button', { name: 'Select' }).first().click();

    const toast = plansPage.toast.achievementUnlocked;
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Financial Commitment');
  });

  test('unlocks "Dead Pixel Hunter" on dead pixel click', async ({ page }) => {
    const achievementPage = getAchievementsPage(page);
    await achievementPage.goto();

    const deadPixel = page.locator('[data-testid="dead-pixel"]').first();
    // It might take a bit to appear due to useEffect and hydration
    await expect(deadPixel).toBeVisible({ timeout: 15000 });
    await deadPixel.click({ force: true });

    const toast = achievementPage.toast.achievementUnlocked;
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Dead Pixel Hunter');
  });

  test('unlocks "Right-Click Rebel" after 20 right clicks', async ({
    page,
  }) => {
    const achievementPage = getAchievementsPage(page);
    await achievementPage.goto();

    await page.waitForFunction(() => window.maw?._emit !== undefined);

    for (let i = 0; i < 20; i++) {
      await page.mouse.click(100, 100, {
        button: 'right',
      });
    }

    const toast = achievementPage.toast.achievementUnlocked;
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Right-Click Rebel');
  });

  test('unlocks "The System Admin" on admin login', async ({ page }) => {
    const adminPage = getAdminPage(page);
    await adminPage.goto();

    await expect(page.locator('text=login:')).toBeVisible({ timeout: 15000 });
    await page.keyboard.type('admin', { delay: 50 });
    await page.keyboard.press('Enter');
    await expect(page.locator('text=password:')).toBeVisible();
    await page.keyboard.type('admin', { delay: 50 });
    await page.keyboard.press('Enter');

    const toast = adminPage.toast.achievementUnlocked;
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('The System Admin');
  });

  test('unlocks "Optimistic Gambler" on wheel spin', async ({ page }) => {
    const achievementPage = getAchievementsPage(page);
    await achievementPage.goto();

    const wheelTrigger = page.getByLabel('Wheel of fortune');
    await expect(wheelTrigger).toBeVisible({ timeout: 10000 });
    await wheelTrigger.click();

    const spinButton = page.getByRole('button', { name: 'Click or Tap here!' });
    await expect(spinButton).toBeVisible();
    await spinButton.click();

    const toast = achievementPage.toast.achievementUnlocked;
    await expect(toast).toBeVisible({ timeout: 20000 });
    await expect(toast).toContainText('Optimistic Gambler');
  });
});
