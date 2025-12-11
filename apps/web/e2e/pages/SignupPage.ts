import { type Page } from '@playwright/test';

import { getHeader } from './shared/Header';

export const getSignupPage = (page: Page) => {
  const header = getHeader(page);

  return {
    ...header, // Spread the header locators into the signup page object

    firstNameInput: page.getByRole('textbox', { name: 'First name' }),
    lastNameInput: page.getByRole('textbox', { name: 'Last name' }),
    nicknameInput: page.getByRole('textbox', { name: 'Nickname' }),
    usernameInput: page.getByRole('textbox', { name: 'Username' }),
    emailInput: page.getByRole('textbox', { name: 'Email' }),
    passwordInput: page.getByRole('textbox', { name: 'Password', exact: true }),
    passwordConfirmationInput: page.getByRole('textbox', {
      name: 'Password confirmation',
    }),
    captchaInput: page.getByRole('textbox', { name: 'Captcha' }),

    genderSelect: page.getByLabel('Gender'),
    yearSelect: page.getByLabel('Year'),
    monthSelect: page.getByLabel('Month'),
    daySelect: page.getByLabel('Day'),
    countryCodeSelect: page.getByLabel('Country code'),
    countrySelect: page.getByLabel('Country', { exact: true }),

    privacyPolicyCheckbox: page.getByRole('checkbox', {
      name: 'Accept privacy policy',
    }),
    newsletterCheckbox: page.getByRole('checkbox', {
      name: 'I want to receive newsletter',
    }),

    createAccountButton: page.getByRole('button', {
      name: 'Create my account',
    }),
    decreasePhoneButton: page.getByRole('button', {
      name: 'Decrease phone number',
    }),
    increasePhoneButton: page.getByRole('button', {
      name: 'Increase phone number',
    }),

    forgotPasswordLink: page.getByRole('main').getByText('Forgot password?'),
    loginLink: page.getByRole('main').getByText('Login'),

    requiredFieldErrors: page.locator('text="This field is required."'),
    sumError: page.getByText('Sum of numbers must be at'),
    captchaError: page.getByText('Invalid captcha'),

    goto: async () => {
      await page.goto('/en/user/signup');
    },
  };
};
