import { expect, test } from '@playwright/test';

import { setupE2eTestState } from '../../utils/setup';

test.beforeEach(async ({ page }) => {
  await setupE2eTestState(page);
  await page.goto('/en/user/login');
});

test(
  'user login page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    const header = page.getByRole('banner');
    await expect(header.locator('[aria-current="page"]')).toHaveText('Login');
  },
);

test('user login page show validation error when submitting empty form', async ({
  page,
}) => {
  await page.getByRole('main').getByRole('button', { name: 'Login' }).click();

  const errors = page.locator('text="This field is required."');
  await expect(errors).toHaveCount(1, { timeout: 5000 });
});

test('user login page links to password reminder and signup', async ({
  page,
}) => {
  await page.getByRole('main').getByText('Forgot password?').click();
  await expect(page).toHaveURL(/\/en\/user\/password-reminder\/.*/);

  await page.goBack();

  await page
    .getByRole('main')
    .getByText('Need an account? Signup here')
    .click();
  await expect(page).toHaveURL(/\/en\/user\/signup\/.*/);
});
