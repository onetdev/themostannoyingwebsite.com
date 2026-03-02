import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getAchievementsPage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    achievementCard: page.getByTestId('achievement-card'),

    goto: async () => {
      await page.goto('/en/achievements');
    },
  };
};
