import { expect, test } from '@playwright/test';

import { getHotThingsPage } from '../pages/HotThingsPage';
import { setupE2eTestState } from '../utils/setup';

test(
  'hot things page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    const hotThingsPage = getHotThingsPage(page);
    await hotThingsPage.goto();

    await expect(hotThingsPage.activeMenuItem).toHaveText('Hot things');
  },
);

// TODO: Add test for checking trying to play the video and going through permission request flow
