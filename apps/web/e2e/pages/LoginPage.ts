import { type Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getLoginPage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

    headline: page.getByRole('heading', { name: 'Login' }),
    emailInput: page.getByRole('textbox', { name: 'Email' }),
    passwordInput: page.getByLabel('Password'),
    rememberMeCheckbox: page.getByRole('checkbox', { name: 'Remember me' }),
    submitButton: page.getByRole('button', { name: 'Login' }),

    forgotPasswordLink: page.getByRole('main').getByText('Forgot password?'),
    signupLink: page
      .getByRole('main')
      .getByText('Need an account? Signup here'),
    requiredFieldErrors: page.locator('text="This field is required."'),

    goto: async () => {
      await page.goto('/en/user/login');
    },
  };
};
