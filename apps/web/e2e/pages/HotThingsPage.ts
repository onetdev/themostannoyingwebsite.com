import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getHotThingsPage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    headline: page.getByRole('heading', { name: 'Hot things' }),
    video: page.locator('video'),
    playButton: page.getByRole('button', { name: 'Play video' }),

    goto: async () => {
      await page.goto('/en/hot-things');
    },
  };
};
