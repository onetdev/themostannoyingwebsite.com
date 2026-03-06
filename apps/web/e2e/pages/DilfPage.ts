import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getDilfPage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    headline: page.getByRole('heading', {
      name: "DILF - Donut I'd Like to Feast On",
    }),

    goto: async () => {
      await page.goto('/en/dilf');
    },
  };
};
