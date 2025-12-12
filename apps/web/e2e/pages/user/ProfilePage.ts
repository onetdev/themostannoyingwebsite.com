import { type Page } from '@playwright/test';

import { getFooter } from '../shared/Footer';
import { getHeader } from '../shared/Header';

export const getProfilePage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

    headline: page.getByRole('heading', { name: 'Profile' }),
    content: page.getByText('Hmm, you are not supposed to be here 😡'),

    goto: async () => {
      await page.goto('/en/user/profile');
    },
  };
};
