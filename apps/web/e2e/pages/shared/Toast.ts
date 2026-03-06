import type { Page } from '@playwright/test';

export const getToast = (page: Page) => {
  return {
    achievementUnlocked: page.locator('button', {
      hasText: 'Achievement Unlocked!',
    }),
  };
};
