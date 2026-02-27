import type { Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getPrivacyPolicyPage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

    headline: page.getByRole('heading', {
      name: 'Privacy Policy',
      exact: true,
    }),

    goto: async () => {
      await page.goto('/en/privacy-policy');
    },
  };
};
