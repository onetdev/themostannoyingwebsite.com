import type { Page } from '@playwright/test';

import { getFooter } from '../shared/Footer';
import { getHeader } from '../shared/Header';

export const getSignupPage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header, // Spread the header locators into the signup page object
    ...footer,

    firstNameInput: page.getByRole('textbox', { name: 'First name' }),
    lastNameInput: page.getByRole('textbox', { name: 'Last name' }),
    nicknameInput: page.getByRole('textbox', { name: 'Nickname' }),
    usernameInput: page.getByRole('textbox', { name: 'Username' }),
    emailInput: page.getByRole('textbox', { name: 'Email' }),
    passwordInput: page.getByRole('textbox', { name: 'Password', exact: true }),
    passwordConfirmationInput: page.getByRole('textbox', {
      name: 'Password confirmation',
    }),
    genderSelect: page.getByRole('combobox', { name: 'Gender' }),
    dobYearSelect: page.getByRole('combobox', { name: 'Year' }),
    dobMonthSelect: page.getByRole('combobox', { name: 'Month' }),
    dobDaySelect: page.getByRole('combobox', { name: 'Day' }),
    countryCodeSelect: page.getByRole('combobox', { name: 'Country code' }),
    countrySelect: page.getByRole('combobox', { name: 'Country', exact: true }),

    consentPivacyPolicyCheckbox: page.getByRole('checkbox', {
      name: 'Accept privacy policy',
    }),
    consentNewsletterCheckbox: page.getByRole('checkbox', {
      name: 'I want to receive newsletter',
    }),
    consentFirstBornChild: page.getByRole('checkbox', {
      name: "My first born child's soul",
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

    captchaInput: page.getByRole('textbox', { name: 'Captcha' }),
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
