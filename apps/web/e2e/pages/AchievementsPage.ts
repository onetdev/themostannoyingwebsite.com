import type { Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getAchievementsPage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

    achievementCard: page.getByTestId('achievement-card'),

    goto: async () => {
      await page.goto('/en/achievements');
    },
  };
};
