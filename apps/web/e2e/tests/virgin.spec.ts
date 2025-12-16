import { expect, test } from '@playwright/test';

import { getVirginPage } from '../pages/VirginPage';
import { setupE2eTestState } from '../utils/setup';

test('visiting virgin page should turn off all experience', async ({
  page,
}) => {
  await setupE2eTestState(page); // Ensure initial state is clean
  const virginPage = getVirginPage(page);
  await virginPage.goto(); // Go to the page where flags should be off

  const localStorageState = await page.evaluate(() => {
    const key = 'zustand-experience-flags-storage';
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  });

  expect(localStorageState).not.toBeNull();
  expect(localStorageState.state).toEqual({
    gifts: {
      detectAdblocker: false,
      flaps: false,
      oneByOne: false,
    },
    clipboardMarker: false,
    contentPaywall: false,
    deadPixel: false,
    disableContextMenu: false,
    exitPrompt: false,
    historySpam: false,
    mockChat: false,
    newsletterModal: false,
    notifications: false,
    pageTitle: {
      inactiveMarquee: false,
      randomGlitch: false,
      inactiveArrayPaged: false,
    },
    searchDelay: false,
    stickyVideo: false,
    wheelOfFortune: false,
  });
});
