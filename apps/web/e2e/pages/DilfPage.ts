import { type Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getDilfPage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

    headline: page.getByRole('heading', {
      name: "DILF - Donut I'd Like to Feast On",
    }),

    goto: async () => {
      await page.goto('/en/dilf');
    },
  };
};
