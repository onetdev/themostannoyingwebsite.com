import { expect, test } from '@playwright/test';
import { PAIN_PREFERENCES_STORAGE_KEY, PUBLIC_PAIN_POINT_LIST } from '@/stores';
import { getVirginPage } from '../pages/VirginPage';
import { setupE2eTestState } from '../utils/setup';

test('virgin content sits flush with its container', async ({ page }) => {
  await setupE2eTestState(page);
  const virginPage = getVirginPage(page);
  await virginPage.goto();

  const content = virginPage.description.locator('..');
  await expect(content).toBeVisible();

  const padding = await content.evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      blockStart: Number.parseFloat(styles.paddingBlockStart),
      blockEnd: Number.parseFloat(styles.paddingBlockEnd),
    };
  });

  // The content module's default `py-5` is turned off via `contentFlush`,
  // because the page layout already provides its own vertical spacing.
  expect(padding.blockStart).toBe(0);
  expect(padding.blockEnd).toBe(0);
});

test('visiting virgin page should turn off all pain points', async ({
  page,
}) => {
  await setupE2eTestState(page); // Ensure initial state is clean
  const virginPage = getVirginPage(page);
  await virginPage.goto(); // Go to the page where flags should be off

  const localStorageState = await page.evaluate((key) => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }, PAIN_PREFERENCES_STORAGE_KEY);

  expect(localStorageState).not.toBeNull();
  expect(localStorageState.state).toEqual({
    flags: {
      'pageTitle.inactiveArrayPaged': false,
      'pageTitle.inactiveMarquee': false,
      'pageTitle.randomGlitch': false,
      'promotions.detectAdblocker': false,
      'promotions.flaps': false,
      'promotions.oneByOne': false,
      achievementNotifications: false,
      clipboardMarker: false,
      contentPaywall: false,
      deadPixel: false,
      disableContextMenu: false,
      exitPrompt: false,
      historySpam: false,
      mockChat: false,
      newsletterModal: false,
      notifications: false,
      screensaver: false,
      searchDelay: false,
      stickyVideo: false,
      wheelOfFortune: false,
    },
    publicLevel: {
      current: 0,
      max: PUBLIC_PAIN_POINT_LIST.length,
    },
    screensaver: {
      timeoutSeconds: expect.any(Number),
      variant: expect.any(String),
    },
  });
});
