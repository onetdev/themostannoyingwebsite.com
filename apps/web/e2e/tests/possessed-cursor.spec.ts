import { expect, test } from '@playwright/test';

import { allDisabledPainPreferencesState } from '../fixtures/pain-preferences';
import { acceptedUserGrantsState } from '../fixtures/user-grants';
import {
  setAchievements,
  setPainPreferences,
  setUserGrants,
} from '../utils/zustand';

test.beforeEach(async ({ page }) => {
  await setPainPreferences(page, {
    ...allDisabledPainPreferencesState,
    flags: {
      ...allDisabledPainPreferencesState.flags,
      achievementNotifications: true,
      possessedCursor: true,
    },
  });
  await setUserGrants(page, acceptedUserGrantsState);
  await setAchievements(page, {
    achievements: {
      'first-visit': {
        id: 'first-visit',
        achieved: true,
        progress: 1,
        completedAt: 1,
        updatedAt: 1,
      },
    },
  });
});

test('spawns a rogue cursor without introducing scrollbars', async ({
  page,
}) => {
  await page.clock.install();
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute(
    'data-possessed-cursor',
    'true',
  );
  await page.clock.fastForward(45_000);

  const ghost = page.getByTestId('possessed-ghost-cursor').first();
  await expect(ghost).toBeVisible();

  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test('catching a rogue cursor unlocks "Cursor Wrangler"', async ({ page }) => {
  await page.clock.install();
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute(
    'data-possessed-cursor',
    'true',
  );
  await page.clock.fastForward(45_000);

  const ghost = page.getByTestId('possessed-ghost-cursor').first();
  await expect(ghost).toBeVisible();
  const bounds = await ghost.boundingBox();
  expect(bounds).not.toBeNull();
  const urlBeforeClick = page.url();

  await page.mouse.click(
    (bounds?.x ?? 0) + (bounds?.width ?? 0) / 2,
    (bounds?.y ?? 0) + (bounds?.height ?? 0) / 2,
  );

  await expect(page.getByTestId('possessed-cursor-puff')).toBeVisible();
  await expect(page).toHaveURL(urlBeforeClick);
  await expect(page.getByText('Cursor Wrangler')).toBeVisible();
});
