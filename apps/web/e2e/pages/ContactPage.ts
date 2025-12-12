import { type Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getContactPage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

    headline: page.getByRole('heading', { name: 'Contact' }),
    emailLink: page.locator('a[href^="mailto:"]'),

    goto: async () => {
      await page.goto('/en/contact');
    },
  };
};
