import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getContactPage = (page: Page) => {
  const shared = getSharedLocators(page);
  const pageLocator = page.locator('main');

  return {
    ...shared,

    headline: pageLocator.getByRole('heading', { name: 'Contact' }),
    subjectInput: pageLocator.getByRole('textbox', { name: 'Subject' }),
    messageInput: pageLocator.getByRole('textbox', { name: 'Message' }),
    sendLink: pageLocator.getByRole('link', { name: 'Send' }),
    emailLink: pageLocator.getByRole('link', {
      name: 'info@themostannoyingwebsite.com',
    }),

    goto: async () => {
      await page.goto('/en/contact');
    },
  };
};
