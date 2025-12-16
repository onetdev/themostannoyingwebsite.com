import { expect, test } from '@playwright/test';

import { getAdminPage } from '../pages/AdminPage';
import { getDonatePage } from '../pages/DonatePage';
import { setupE2eTestState } from '../utils/setup';

test.beforeEach(async ({ page }) => {
  await setupE2eTestState(page);
});

test(
  'admin page successful login flow',
  { tag: '@smoke' },
  async ({ page }) => {
    const adminPage = getAdminPage(page);
    await adminPage.goto();

    // Wait for login prompt, considering the boot delay
    await expect(adminPage.loginPrompt).toBeVisible({
      timeout: 10000,
    });

    await adminPage.login('admin');

    // Wait for password prompt
    await expect(adminPage.passwordPrompt).toBeVisible();

    await adminPage.password('admin');

    // Check for success message
    await expect(adminPage.accessGrantedMessage).toBeVisible();

    // Wait for the final message before redirection
    await expect(adminPage.safetyMessage).toBeVisible({ timeout: 10000 });

    // Check for redirect to the donate page
    await page.waitForURL('/en/donate/', { timeout: 10000 });
    const successUrl = new URL(page.url());
    expect(successUrl.pathname).toMatch(/^\/en\/donate/);

    const donatePage = getDonatePage(page);
    await expect(donatePage.headline).toBeVisible();
  },
);

test('admin page failed login flow', async ({ page }) => {
  const adminPage = getAdminPage(page);
  await adminPage.goto();

  // Wait for login prompt, considering the boot delay
  await expect(adminPage.loginPrompt).toBeVisible({
    timeout: 10000,
  });

  await adminPage.login('wronguser');

  // Wait for password prompt
  await expect(adminPage.passwordPrompt).toBeVisible();

  await adminPage.password('wrongpassword');

  // Check for failure message
  await expect(adminPage.invalidCredentialsMessage).toBeVisible();
  await expect(adminPage.redirectingMessage).toBeVisible();

  // Check for redirect to the donate page
  await page.waitForURL('/en/donate/', { timeout: 10000 });
  const successUrl = new URL(page.url());
  expect(successUrl.pathname).toMatch(/^\/en\/donate/);

  const donatePage = getDonatePage(page);
  await expect(donatePage.headline).toBeVisible();
});
