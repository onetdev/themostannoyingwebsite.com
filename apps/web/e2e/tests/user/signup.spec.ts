import { expect, test } from '@playwright/test';

import { getSignupPage } from '../../pages/user/SignupPage';
import { setupE2eTestState } from '../../utils/setup';

test.beforeEach(async ({ page }) => {
  const signupPage = getSignupPage(page);
  await setupE2eTestState(page);
  await signupPage.goto();
});

test(
  'signup page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    const signupPage = getSignupPage(page);
    await expect(signupPage.activeMenuItem).toHaveText('Login');
  },
);

// TODO: Checking for validation error messages will require a lot of attention.
test('signup page has 5 required field errors when submitting an empty form', async ({
  page,
}) => {
  const signupPage = getSignupPage(page);
  await signupPage.privacyPolicyCheckbox.check();

  await signupPage.createAccountButton.click();

  await expect(signupPage.requiredFieldErrors).toHaveCount(5, {
    timeout: 5000,
  });
});

test('signup page field focusability and simple submission check', async ({
  page,
}) => {
  const signupPage = getSignupPage(page);

  await signupPage.firstNameInput.click();
  await signupPage.firstNameInput.fill('Firstname');
  await signupPage.lastNameInput.click();
  await signupPage.lastNameInput.fill('Lastname');
  await signupPage.nicknameInput.click();
  await signupPage.nicknameInput.fill('Nickname');
  await signupPage.usernameInput.click();
  await signupPage.usernameInput.fill('username');
  await signupPage.emailInput.click();
  await signupPage.emailInput.fill('info@onet.dev');
  await signupPage.passwordInput.fill('Password!666');
  await signupPage.passwordConfirmationInput.fill('Password!666');
  await signupPage.genderSelect.selectOption('alien');
  await signupPage.yearSelect.selectOption('1978');
  await signupPage.monthSelect.selectOption('1');
  await signupPage.daySelect.selectOption('1');
  await signupPage.countryCodeSelect.selectOption('+36');
  await signupPage.decreasePhoneButton.click();
  await signupPage.increasePhoneButton.click();

  await signupPage.countrySelect.selectOption('HU');

  await signupPage.newsletterCheckbox.check();
  await signupPage.privacyPolicyCheckbox.check();

  await signupPage.captchaInput.click();
  await signupPage.captchaInput.fill('invalid');

  await signupPage.createAccountButton.click();

  // And now looking for errors
  await expect(signupPage.captchaError).toHaveCount(1);
});

test('user signup page links to password reminder and login', async ({
  page,
}) => {
  const signupPage = getSignupPage(page);
  await signupPage.forgotPasswordLink.click();
  await expect(page).toHaveURL(/\/en\/user\/password-reminder\/.*/);

  await page.goBack();

  await signupPage.loginLink.click();
  await expect(page).toHaveURL(/\/en\/user\/login\/.*/);
});
