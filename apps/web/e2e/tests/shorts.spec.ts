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
    items: Array<{ slug: string; title: string; ai_assisted: boolean }>;
  };

  return data.items[0];
}

test('shorts player plays a dedicated, full-screen vertical feed', async ({
  page,
  request,
}) => {
  const short = await fetchFirstShort(request);
  test.skip(short === undefined, 'The Content API does not expose shorts yet.');

  if (!short) {
    return;
  }

  await setupE2eTestState(page);
  await page.goto(`/en/shorts/${short.slug}/`);

  await expect(page.getByTestId('short-player-page')).toBeVisible();
  await expect(page.getByTestId('shorts-player')).toBeVisible();
  await expect(page.getByTestId('short-player-overlay')).toBeVisible();
  await expect(page.getByRole('heading', { name: short.title })).toBeVisible();

  const video = page.locator('video').first();
  await expect(video).toHaveAttribute('loop');
  await expect(video).toHaveAttribute('playsinline');

  // The persistent controls stay mounted; only play/pause is transient.
  await expect(page.getByRole('button', { name: /Mute|Unmute/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Share/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Like' })).toBeVisible();
  await expect(page.getByRole('group', { name: 'Seek' })).toBeVisible();

  await page
    .getByTestId('short-player-tap-layer')
    .first()
    .dblclick({ position: { x: 30, y: 300 } });
  await expect(page.getByRole('button', { name: 'Unlike' })).toBeVisible();

  if (short.ai_assisted) {
    await expect(page.getByTestId('short-ai-badge')).toBeVisible();
  }

  const initialPath = new URL(page.url()).pathname;
  await page.keyboard.press('ArrowDown');
  await expect.poll(() => new URL(page.url()).pathname).not.toBe(initialPath);
  await expect(page).toHaveURL(/\/en\/shorts\/[^/]+\/$/);

  await page.getByRole('button', { name: 'Close player' }).click();
  await expect(page).toHaveURL(/\/en\/$/);
});
