import { expect, test } from '@playwright/test';

import { getShortsPlayerPage } from '../pages/ShortsPlayerPage';
import { fetchFirstShort } from '../utils/content-api';
import { setupE2eTestState } from '../utils/setup';

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
  const shortsPage = getShortsPlayerPage(page);
  await shortsPage.goto(short.slug);

  await expect(shortsPage.pageShell).toBeVisible();
  await expect(shortsPage.player).toBeVisible();
  await expect(shortsPage.overlay).toBeVisible();
  await expect(page.getByRole('heading', { name: short.title })).toBeVisible();

  await expect(shortsPage.video).toHaveAttribute('loop');
  await expect(shortsPage.video).toHaveAttribute('playsinline');

  // The persistent controls stay mounted; only play/pause is transient.
  await expect(page.getByRole('button', { name: /Mute|Unmute/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Share/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Like' })).toBeVisible();
  await expect(page.getByRole('group', { name: 'Seek' })).toBeVisible();

  await shortsPage.tapLayer.dblclick({ position: { x: 30, y: 300 } });
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

test('shorts comments open beside the video on desktop', async ({
  page,
  request,
}) => {
  const short = await fetchFirstShort(request);
  test.skip(short === undefined, 'The Content API does not expose shorts yet.');

  if (!short) {
    return;
  }

  await setupE2eTestState(page);
  const shortsPage = getShortsPlayerPage(page);
  await shortsPage.goto(short.slug);

  await shortsPage.commentsToggle.click();

  await expect(shortsPage.commentsDesktop).toBeVisible();
  await expect(shortsPage.commentsPanel).toBeVisible();
  await expect(shortsPage.player).toBeVisible();
  await expect(shortsPage.commentComposer).toBeVisible();
  await expect(shortsPage.commentItems.first()).toBeVisible();
  await expect(shortsPage.commentsToggle).toHaveAttribute(
    'aria-expanded',
    'true',
  );
});

test('shorts comments open as an 80dvh sheet on mobile', async ({
  page,
  request,
}) => {
  const short = await fetchFirstShort(request);
  test.skip(short === undefined, 'The Content API does not expose shorts yet.');

  if (!short) {
    return;
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await setupE2eTestState(page);
  const shortsPage = getShortsPlayerPage(page);
  await shortsPage.goto(short.slug);

  await shortsPage.commentsToggle.click();

  await expect(shortsPage.commentsDrawer).toBeVisible();
  await expect(shortsPage.commentsPanel).toBeVisible();
  await expect
    .poll(async () => (await shortsPage.commentsDrawer.boundingBox())?.height)
    .toBeGreaterThan(844 * 0.75);
  await expect
    .poll(async () => (await shortsPage.commentsDrawer.boundingBox())?.height)
    .toBeLessThan(844 * 0.85);

  await shortsPage.commentComposer.fill('Nice clip');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByText('Login Required')).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await shortsPage.commentsClose.click();
  await expect(shortsPage.commentsDrawer).not.toBeVisible();
});
