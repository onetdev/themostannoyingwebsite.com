import { type Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getFlaimAPhonePage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

    headline: page.getByRole('heading', {
      name: "Congratulations! You've wan a phone! Flaim now!",
    }),
    surveyOption: page.getByRole('radio'),
    nextButton: page.getByRole('button', { name: 'Next' }),

    goto: async () => {
      await page.goto('/en/flaim-a-phone');
    },
  };
};
