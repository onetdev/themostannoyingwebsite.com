import { type Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getHotThingsPage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

    headline: page.getByRole('heading', { name: 'Hot things' }),
    video: page.locator('video'),
    playButton: page.getByRole('button', { name: 'Play video' }),

    goto: async () => {
      await page.goto('/en/hot-things');
    },
  };
};
