import { expect, test } from '@playwright/test';

test(
  'signup page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await page.goto('/en/virgin');
    await page.goto('/en/user/signup');

    const header = page.getByRole('banner');
    await expect(header.locator('[aria-current="page"]')).toHaveText('Login');
  },
);

test('signup page has 9 required field errors when submitting an empty form', async ({
  page,
}) => {
  await page.goto('/en/virgin');
  await page.goto('/en/user/signup');

  await page.getByRole('checkbox', { name: 'Accept privacy policy' }).check();

  await page.getByRole('button', { name: 'Create my account' }).click();

  const errors = page.locator('text="This field is required."');
  await expect(errors).toHaveCount(9, { timeout: 5000 });
});

test('signup page field focusability and simple submission check', async ({
  page,
}) => {
  await page.goto('/en/virgin');
  await page.goto('/en/user/signup');

  await page.getByRole('textbox', { name: 'First name' }).click();
  await page.getByRole('textbox', { name: 'First name' }).fill('Firstname');
  await page.getByRole('textbox', { name: 'Last name' }).click();
  await page.getByRole('textbox', { name: 'Last name' }).fill('Lastname');
  await page.getByRole('textbox', { name: 'Nickname' }).click();
  await page.getByRole('textbox', { name: 'Nickname' }).fill('Nickname');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('username');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('info@onet.dev');
  await page
    .getByRole('textbox', { name: 'Password', exact: true })
    .fill('Password!666');
  await page
    .getByRole('textbox', { name: 'Password confirmation' })
    .fill('Password!666');
  await page.getByLabel('Gender').selectOption('alien');
  await page.getByLabel('Year').selectOption('1978');
  await page.getByLabel('Month').selectOption('1');
  await page.getByLabel('Day').selectOption('1');
  await page.getByLabel('Country code').selectOption('+36');
  await page.getByRole('button', { name: 'Decrease phone number' }).click();
  await page.getByRole('button', { name: 'Increase phone number' }).click();

  await page.getByLabel('Country', { exact: true }).selectOption('HU');

  await page
    .getByRole('checkbox', { name: 'I want to receive newsletter' })
    .check();
  await page.getByRole('checkbox', { name: 'Accept privacy policy' }).check();

  await page.getByRole('textbox', { name: 'Captcha' }).click();
  await page.getByRole('textbox', { name: 'Captcha' }).fill('invalid');

  await page.getByRole('button', { name: 'Create my account' }).click();

  // And now looking for errors
  await expect(page.getByText('Sum of numbers must be at')).toHaveCount(1);
  await expect(page.getByText('Invalid captcha')).toHaveCount(1);
});
