import { type Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getContactPage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  const pageLocator = page.locator('main');

  return {
    ...header,
    ...footer,

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
