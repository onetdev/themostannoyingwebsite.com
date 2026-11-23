import { expect, test } from '@playwright/test';

import { SHORTS_ENTRY_STORAGE_KEY } from '@/features/content/shorts-entry';
import { fetchFirstShort } from '../utils/content-api';
import { setupE2eTestState } from '../utils/setup';

test('shorts archive lists clips and opens the player', async ({
  page,
  request,
}) => {
  const short = await fetchFirstShort(request);
  test.skip(short === undefined, 'The Content API does not expose shorts yet.');

  await setupE2eTestState(page);
  await page.goto('/en/shorts/');

  await expect(page.getByTestId('shorts-page')).toBeVisible();
  await expect(page.getByTestId('short-grid')).toBeVisible();
  await expect(page.getByTestId('short-card').first()).toBeVisible();
  await expect(page.getByTestId('short-type-badge').first()).toHaveText(
    /Short/,
  );
  await expect(
    page.getByRole('link', { name: 'Shorts' }).first(),
  ).toBeVisible();

  await page.getByTestId('short-card').first().hover();
  await expect(page.locator('video')).toHaveCount(1);

  await page.getByTestId('short-card').first().click();
  await expect(page).toHaveURL(/\/en\/shorts\/[^/]+\/$/);
  await expect(page.getByTestId('short-player-page')).toBeVisible();

  await page.getByRole('button', { name: 'Close player' }).click();
  await expect(page).toHaveURL(/\/en\/shorts\/$/);
});

test('keeps the player entry point scoped to the tab that opened it', async ({
  page,
  context,
  request,
}) => {
  const short = await fetchFirstShort(request);
  test.skip(short === undefined, 'The Content API does not expose shorts yet.');

  await setupE2eTestState(page);
  await page.goto('/en/shorts/');
  await page.getByTestId('short-card').first().click();
  await expect(page).toHaveURL(/\/en\/shorts\/[^/]+\/$/);

  expect(
    await page.evaluate(
      (key) => window.sessionStorage.getItem(key),
      SHORTS_ENTRY_STORAGE_KEY,
    ),
  ).toBe('/shorts/');

  const otherTab = await context.newPage();
  await setupE2eTestState(otherTab);
  await otherTab.goto('/en/shorts/');

  expect(
    await otherTab.evaluate(
      (key) => window.sessionStorage.getItem(key),
      SHORTS_ENTRY_STORAGE_KEY,
    ),
  ).toBeNull();

  await otherTab.close();
});
