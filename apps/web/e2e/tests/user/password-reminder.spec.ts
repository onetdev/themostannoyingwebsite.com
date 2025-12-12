import { expect, test } from '@playwright/test';

import { getPasswordReminderPage } from '../../pages/PasswordReminderPage';
import { setupE2eTestState } from '../../utils/setup';

test.beforeEach(async ({ page }) => {
  await setupE2eTestState(page);
  const passwordReminderPage = getPasswordReminderPage(page);
  await passwordReminderPage.goto();
});

test(
  'password reminder page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    const passwordReminderPage = getPasswordReminderPage(page);
    await expect(passwordReminderPage.activeMenuItem).toHaveText('Login');
  },
);

test('password reminder shows validation error on submit', async ({ page }) => {
  const passwordReminderPage = getPasswordReminderPage(page);
  await passwordReminderPage.emailInput.click();
  await passwordReminderPage.emailInput.fill('info@onet.dev');

  await passwordReminderPage.submitButton.click();

  await expect(passwordReminderPage.captchaError).toHaveCount(1);
});

test('password reminder page links to login and signup', async ({ page }) => {
  const passwordReminderPage = getPasswordReminderPage(page);
  await passwordReminderPage.loginLink.click();
  await expect(page).toHaveURL(/\/en\/user\/login\/.*/);

  await page.goBack();

  await passwordReminderPage.signupLink.click();
  await expect(page).toHaveURL(/\/en\/user\/signup\/.*/);
});
