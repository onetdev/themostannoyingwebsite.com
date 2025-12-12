import { expect, test } from '@playwright/test';

import { getLoginPage } from '../../pages/LoginPage';
import { setupE2eTestState } from '../../utils/setup';

test.beforeEach(async ({ page }) => {
  await setupE2eTestState(page);
  const loginPage = getLoginPage(page);
  await loginPage.goto();
});

test(
  'user login page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    const loginPage = getLoginPage(page);
    await expect(loginPage.activeMenuItem).toHaveText('Login');
  },
);

test('user login page show validation error when submitting empty form', async ({
  page,
}) => {
  const loginPage = getLoginPage(page);
  await loginPage.submitButton.click();

  await expect(loginPage.requiredFieldErrors).toHaveCount(1, { timeout: 5000 });
});

test('user login page links to password reminder and signup', async ({
  page,
}) => {
  const loginPage = getLoginPage(page);
  await loginPage.forgotPasswordLink.click();
  await expect(page).toHaveURL(/\/en\/user\/password-reminder\/.*/);

  await page.goBack();

  await loginPage.signupLink.click();
  await expect(page).toHaveURL(/\/en\/user\/signup\/.*/);
});
