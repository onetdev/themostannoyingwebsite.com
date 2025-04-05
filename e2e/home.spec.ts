import { expect, test } from '@playwright/test';

test('when opening domain the user gets redirected to /en', async ({
  page,
}) => {
  await page.goto('http://localhost:3000/');

  await expect(page).toHaveURL('http://localhost:3000/en/');

  await expect(page).toHaveTitle(/The Most Annoying Website/);
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole('heading', { name: 'Installation' }),
//   ).toBeVisible();
// });
