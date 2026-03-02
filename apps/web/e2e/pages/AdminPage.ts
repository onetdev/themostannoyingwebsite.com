import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getAdminPage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    loginPrompt: page.getByText('login: '),
    passwordPrompt: page.getByText('password: '),
    accessGrantedMessage: page.getByText(/Access granted/),
    safetyMessage: page.getByText(/I'm getting back you to safety.../),
    invalidCredentialsMessage: page.getByText(/Invalid credentials/),
    redirectingMessage: page.getByText('Redirecting...'),

    login: async (username: string) => {
      await page.keyboard.type(username);
      await page.keyboard.press('Enter');
    },

    password: async (password: string) => {
      await page.keyboard.type(password);
      await page.keyboard.press('Enter');
    },

    goto: async () => {
      await page.goto('/en/admin');
    },
  };
};
