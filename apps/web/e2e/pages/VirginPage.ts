import type { Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getVirginPage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

    headline: page.getByRole('heading', { name: 'Disable all pain points' }),
    description: page.getByText('All pain points are disabled now'),

    goto: async () => {
      await page.goto('/en/virgin');
    },
  };
};
