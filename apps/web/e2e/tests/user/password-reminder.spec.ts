import { expect, test } from '@playwright/test';

test(
  'password reminder page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await page.goto('/en/virgin');
    await page.goto('/en/user/password-reminder');

    const header = page.getByRole('banner');
    await expect(header.locator('[aria-current="page"]')).toHaveText('Login');
  },
);

test('password reminder show invalid captcha error on submit', async ({
  page,
}) => {
  await page.goto('/en/virgin');
  await page.goto('/en/user/password-reminder');

  const emailInput = page.getByRole('textbox', { name: 'Email' });
  await emailInput.click();
  await emailInput.fill('info@onet.dev');

  await page.getByRole('button', { name: 'Send password reminder' }).click();

  await expect(page.getByText('Invalid captcha')).toHaveCount(1);
});

test('password reminder page links to login and signup', async ({ page }) => {
  await page.goto('/en/virgin');
  await page.goto('/en/user/password-reminder');

  await page.getByRole('main').getByText('Login').click();
  await expect(page).toHaveURL(/\/en\/user\/login\/.*/);

  await page.goBack();

  await page.getByRole('main').getByText('Signup').click();
  await expect(page).toHaveURL(/\/en\/user\/signup\/.*/);
});
