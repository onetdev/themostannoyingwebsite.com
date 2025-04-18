import { expect, test } from '@playwright/test';

test('registration page loads and its menu item is active', async ({
  page,
}) => {
  await page.goto('/en/user/registration');

  const header = page.getByRole('banner');
  await expect(header.locator('[aria-current="page"]')).toHaveText('Login');
});
