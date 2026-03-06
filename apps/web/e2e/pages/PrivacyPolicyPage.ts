import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getPrivacyPolicyPage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    headline: page.getByRole('heading', {
      name: 'Privacy Policy',
      exact: true,
    }),

    goto: async () => {
      await page.goto('/en/privacy-policy');
    },
  };
};
