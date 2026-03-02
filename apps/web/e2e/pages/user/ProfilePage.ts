import type { Page } from '@playwright/test';

import { getSharedLocators } from '../shared/Shared';

export const getProfilePage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    headline: page.getByRole('heading', { name: 'Profile' }),
    content: page.getByText('Hmm, you are not supposed to be here 😡'),

    goto: async () => {
      await page.goto('/en/user/profile');
    },
  };
};
