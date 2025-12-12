import { type Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getPasswordReminderPage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

    headline: page.getByRole('heading', { name: 'Password Reminder' }),
    emailInput: page.getByRole('textbox', { name: 'Email' }),
    submitButton: page.getByRole('button', { name: 'Send password reminder' }),

    loginLink: page.getByRole('main').getByText('Login'),
    signupLink: page.getByRole('main').getByText('Signup'),
    captchaError: page.getByText('Captcha is required'),

    goto: async () => {
      await page.goto('/en/user/password-reminder');
    },
  };
};
