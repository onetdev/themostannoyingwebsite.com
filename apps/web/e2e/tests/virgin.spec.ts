import { expect, test } from '@playwright/test';

import { getVirginPage } from '../pages/VirginPage';
import { setupE2eTestState } from '../utils/setup';

import { PUBLIC_PAIN_POINT_LIST } from '@/kernel';

test('visiting virgin page should turn off all pain points', async ({
  page,
}) => {
  await setupE2eTestState(page); // Ensure initial state is clean
  const virginPage = getVirginPage(page);
  await virginPage.goto(); // Go to the page where flags should be off

  const localStorageState = await page.evaluate(() => {
    const key = 'zustand-pain-preferences-storage';
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  });

  expect(localStorageState).not.toBeNull();
  expect(localStorageState.state).toEqual({
    flags: {
      'gifts.detectAdblocker': false,
      'gifts.flaps': false,
      'gifts.oneByOne': false,
      'pageTitle.inactiveArrayPaged': false,
      'pageTitle.inactiveMarquee': false,
      'pageTitle.randomGlitch': false,
      clipboardMarker: false,
      contentPaywall: false,
      deadPixel: false,
      disableContextMenu: false,
      exitPrompt: false,
      historySpam: false,
      mockChat: false,
      newsletterModal: false,
      notifications: false,
      searchDelay: false,
      stickyVideo: false,
      wheelOfFortune: false,
    },
    publicLevel: {
      current: 0,
      max: PUBLIC_PAIN_POINT_LIST.length,
    },
  });
});
