import { expect, test } from '@playwright/test';

test(
  'user login page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await page.goto('/en/virgin');
    await page.goto('/en/user/login');

    const header = page.getByRole('banner');
    await expect(header.locator('[aria-current="page"]')).toHaveText('Login');
  },
);

test('user login page show validation error when submitting empty form', async ({
  page,
}) => {
  await page.goto('/en/virgin');
  await page.goto('/en/user/login');

  await page.getByRole('main').getByRole('button', { name: 'Login' }).click();

  const errors = page.locator('text="This field is required."');
  await expect(errors).toHaveCount(3, { timeout: 5000 });
});

test('user login page links to password reminder and signup', async ({
  page,
}) => {
  await page.goto('/en/virgin/');
  await page.goto('/en/user/login/');

  await page.getByRole('main').getByText('Forgot password?').click();
  await expect(page).toHaveURL(/\/en\/user\/password-reminder\/.*/);

  await page.goBack();

  await page
    .getByRole('main')
    .getByText('Need an account? Signup here')
    .click();
  await expect(page).toHaveURL(/\/en\/user\/signup\/.*/);
});
