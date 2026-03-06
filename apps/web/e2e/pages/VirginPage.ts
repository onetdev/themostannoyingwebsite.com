import type { Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';
import { getSharedLocators } from './shared/Shared';

export const getVirginPage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    headline: page.getByRole('heading', { name: 'Disable all pain points' }),
    description: page.getByText('All pain points are disabled now'),

    goto: async () => {
      await page.goto('/en/virgin');
    },
  };
};
