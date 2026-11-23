import type { APIRequestContext } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { setupE2eTestState } from '../utils/setup';

const contentApiBaseUrl =
  process.env.NEXT_PUBLIC_CONTENT_API_URL ??
  'https://content.themostannoyingwebsite.com';

async function fetchFirstShort(request: APIRequestContext) {
  const response = await request.get(
    `${contentApiBaseUrl}/api/v1/shorts?lang=en&limit=1`,
  );

  if (!response.ok()) {
    return undefined;
  }

  const data = (await response.json()) as {
    items: Array<{ slug: string }>;
  };

  return data.items[0];
}

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
});
