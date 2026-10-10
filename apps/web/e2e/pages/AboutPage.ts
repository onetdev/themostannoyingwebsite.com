import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getAboutPage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    headline: page.getByRole('heading', { name: 'About' }),

    tableOfContents: page.getByRole('navigation', { name: 'On this page' }),

    goto: async () => {
      await page.goto('/en/about');
    },
  };
};
