import type { Page } from '@playwright/test';

import { getSharedLocators } from '../shared/Shared';

export const getPasswordReminderPage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    headline: page.getByRole('heading', { name: 'Password Reminder' }),
    emailInput: page.getByRole('textbox', { name: /^Email/ }),
    submitButton: page.getByRole('button', { name: 'Send password reminder' }),

    loginLink: page.getByRole('main').getByText('Login'),
    signupLink: page.getByRole('main').getByText('Signup'),
    captchaError: page.getByText('Captcha is required'),

    goto: async () => {
      await page.goto('/en/user/password-reminder');
    },
  };
};
