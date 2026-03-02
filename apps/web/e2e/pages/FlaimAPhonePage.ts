import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getFlaimAPhonePage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    headline: page.getByRole('heading', {
      name: "Congratulations! You've wan a phone! Flaim now!",
    }),
    getSurveyOption: (index: number) =>
      page.getByTestId(`flaim-survey-option-${index}`),
    nextButton: page.getByRole('button', { name: 'Next' }),
    backToHomeButton: page.getByRole('button', { name: 'Back to home' }),

    goto: async () => {
      await page.goto('/en/flaim-a-phone');
    },
  };
};
