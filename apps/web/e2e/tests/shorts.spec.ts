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
  await expect(shortsPage.logo).toBeVisible();
  await expect(shortsPage.commentCount).toBeVisible();
  await expect(shortsPage.commentCount).toHaveText(/^\d+$/);

  const logoBox = await shortsPage.logo.boundingBox();
  expect(logoBox).not.toBeNull();
  if (logoBox) {
    expect(logoBox.x).toBeLessThan(120);
    expect(logoBox.y).toBeLessThan(120);
  }

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

test('closing the player releases the short media so it cannot resume', async ({
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

  await expect
    .poll(() =>
      page.evaluate(() => document.body.dataset.shortsPlayer === 'true'),
    )
    .toBe(true);

  await page.evaluate(() => {
    const videos = Array.from(
      document.querySelectorAll<HTMLVideoElement>(
        '[data-testid="shorts-player"] video',
      ),
    );
    (
      window as Window & { __shortsVideos?: HTMLVideoElement[] }
    ).__shortsVideos = videos;
  });

  await page.getByRole('button', { name: 'Close player' }).click();
  await expect(page).not.toHaveURL(/\/en\/shorts\//);

  const states = await page.evaluate(() => {
    const videos =
      (window as Window & { __shortsVideos?: HTMLVideoElement[] })
        .__shortsVideos ?? [];

    return videos.map((video) => ({
      hasSrc: video.hasAttribute('src'),
      paused: video.paused,
      hasSrcObject: Boolean(video.srcObject),
    }));
  });

  expect(states.length).toBeGreaterThan(0);
  for (const state of states) {
    expect(state.hasSrc).toBe(false);
    expect(state.paused).toBe(true);
    expect(state.hasSrcObject).toBe(false);
  }
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

  await expect(shortsPage.commentsSheet).toBeVisible();
  await expect(shortsPage.commentsPanel).toBeVisible();
  await expect(shortsPage.player).toBeVisible();
  await expect(shortsPage.commentComposer).toBeVisible();
  await expect(shortsPage.commentItems.first()).toBeVisible();
  await expect(
    page
      .locator('[data-track-section="comments:item"][data-depth="1"]')
      .first(),
  ).toBeVisible();
  await expect(shortsPage.commentsToggle).toHaveAttribute(
    'aria-expanded',
    'true',
  );

  await expect
    .poll(
      async () => (await shortsPage.commentsSheet.boundingBox())?.width ?? 0,
    )
    .toBeGreaterThan(300);

  const sheetBox = await shortsPage.commentsSheet.boundingBox();
  expect(sheetBox).not.toBeNull();
  if (sheetBox) {
    expect(sheetBox.width).toBeLessThan(500);
    expect(sheetBox.x).toBeGreaterThan(700);
  }
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

  await expect(shortsPage.logo).toBeVisible();
  await expect(shortsPage.commentCount).toBeVisible();

  const logoBox = await shortsPage.logo.boundingBox();
  expect(logoBox).not.toBeNull();
  if (logoBox) {
    const logoCenter = logoBox.x + logoBox.width / 2;
    expect(Math.abs(logoCenter - 195)).toBeLessThan(12);
  }

  await shortsPage.commentsToggle.click();

  await expect(shortsPage.commentsSheet).toBeInViewport();
  await expect(shortsPage.commentsPanel).toBeVisible();
  await expect(shortsPage.commentsBackdrop).toBeVisible();
  await expect
    .poll(async () => (await shortsPage.commentsSheet.boundingBox())?.height)
    .toBeGreaterThan(844 * 0.75);
  await expect
    .poll(async () => (await shortsPage.commentsSheet.boundingBox())?.height)
    .toBeLessThan(844 * 0.85);

  await shortsPage.commentComposer.fill('Nice clip');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByText('Login Required')).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();

  const handleBox = await shortsPage.commentsHandle.boundingBox();
  expect(handleBox).not.toBeNull();
  if (handleBox) {
    const x = handleBox.x + handleBox.width / 2;
    const y = handleBox.y + handleBox.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y + 240, { steps: 8 });
    await page.mouse.up();
  }

  await expect(shortsPage.commentsSheet).not.toBeInViewport();
  await expect(shortsPage.commentsSheet).toHaveAttribute('aria-hidden', 'true');
});
