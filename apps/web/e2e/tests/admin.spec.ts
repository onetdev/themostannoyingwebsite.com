import { expect, test } from '@playwright/test';

import { setupE2eTestState } from '../utils/setup';

test.beforeEach(async ({ page }) => {
  await setupE2eTestState(page);
});

test(
  'admin page successful login flow',
  { tag: '@smoke' },
  async ({ page }) => {
    await page.goto('/en/admin');

    // Wait for login prompt, considering the boot delay
    await expect(page.getByText('login: ')).toBeVisible({
      timeout: 10000,
    });

    await page.keyboard.type('admin');
    await page.keyboard.press('Enter');

    // Wait for password prompt
    await expect(page.getByText('password: ')).toBeVisible();

    await page.keyboard.type('admin');
    await page.keyboard.press('Enter');

    // Check for success message
    await expect(page.getByText(/Access granted/)).toBeVisible();

    // Wait for the final message before redirection
    await expect(
      page.getByText(/I'm getting back you to safety.../),
    ).toBeVisible({ timeout: 10000 });

    // Check for redirect to the donate page
    await page.waitForURL('/en/donate/', { timeout: 10000 });
    const successUrl = new URL(page.url());
    expect(successUrl.pathname).toMatch(/^\/en\/donate/);
    await expect(page.getByRole('heading', { name: 'Donate' })).toBeVisible();
  },
);

test('admin page failed login flow', async ({ page }) => {
  await page.goto('/en/admin');

  // Wait for login prompt, considering the boot delay
  await expect(page.getByText('login: ')).toBeVisible({
    timeout: 10000,
  });

  await page.keyboard.type('wronguser');
  await page.keyboard.press('Enter');

  // Wait for password prompt
  await expect(page.getByText('password: ')).toBeVisible();

  await page.keyboard.type('wrongpassword');
  await page.keyboard.press('Enter');

  // Check for failure message
  await expect(page.getByText(/Invalid credentials/)).toBeVisible();
  await expect(page.getByText('Redirecting...')).toBeVisible();

  // Check for redirect to the donate page
  await page.waitForURL('/en/donate/', { timeout: 10000 });
  const successUrl = new URL(page.url());
  expect(successUrl.pathname).toMatch(/^\/en\/donate/);
  await expect(page.getByRole('heading', { name: 'Donate' })).toBeVisible();
});
