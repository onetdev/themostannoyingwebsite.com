import { expect, type Page, test } from '@playwright/test';

import { getHomePage } from '../pages/HomePage';
import { setupE2eTestState } from '../utils/setup';

const ARTWORK = 'footer-artwork';
const ARTWORK_STATE = /ready|failed/;

const openArtwork = async (page: Page) => {
  await setupE2eTestState(page);
  await getHomePage(page).goto();

  const footer = page.getByRole('contentinfo');
  const artwork = page.getByTestId(ARTWORK);

  await artwork.scrollIntoViewIfNeeded();
  await expect(artwork).toBeVisible();
  await expect
    .poll(() => artwork.getAttribute('data-artwork-state'), {
      timeout: 15_000,
    })
    .toMatch(ARTWORK_STATE);

  return { footer, artwork };
};

test('renders the animated wall below the footer', {
  tag: '@smoke',
}, async ({ page }) => {
  const { footer, artwork } = await openArtwork(page);

  await expect(artwork).toHaveAttribute('aria-hidden', 'true');

  const footerBox = await footer.boundingBox();
  const artworkBox = await artwork.boundingBox();

  expect(footerBox).not.toBeNull();
  expect(artworkBox).not.toBeNull();

  if (!footerBox || !artworkBox) {
    throw new Error('Unable to measure the footer and artwork boxes');
  }

  expect(artworkBox.y).toBeGreaterThanOrEqual(
    footerBox.y + footerBox.height - 1,
  );
  expect(artworkBox.width).toBeGreaterThanOrEqual(
    (page.viewportSize()?.width ?? 0) - 1,
  );
});

test('fits a whole-number tile grid', async ({ page }) => {
  const { artwork } = await openArtwork(page);

  const columns = Number(await artwork.getAttribute('data-artwork-columns'));
  const rows = Number(await artwork.getAttribute('data-artwork-rows'));

  expect(Number.isInteger(columns)).toBe(true);
  expect(Number.isInteger(rows)).toBe(true);
  expect(columns).toBeGreaterThan(20);
  expect(rows).toBeGreaterThan(4);
});

test('keeps the page free of horizontal overflow', async ({ page }) => {
  await setupE2eTestState(page);

  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await getHomePage(page).goto();

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );

    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
});

test('does not start the wall before it approaches the viewport', async ({
  page,
}) => {
  await setupE2eTestState(page);
  await getHomePage(page).goto();

  const artwork = page.getByTestId(ARTWORK);

  await expect(artwork).toBeAttached();
  await expect(artwork).toHaveAttribute('data-artwork-state', 'idle');

  const viewport = page.viewportSize();
  const artworkBox = await artwork.boundingBox();

  expect(viewport).not.toBeNull();
  expect(artworkBox).not.toBeNull();

  if (!viewport || !artworkBox) {
    throw new Error('Unable to measure the artwork');
  }

  // The home page is long enough that the wall starts well below the fold.
  expect(artworkBox.y).toBeGreaterThan(viewport.height + 300);

  await artwork.scrollIntoViewIfNeeded();
  await expect
    .poll(() => artwork.getAttribute('data-artwork-state'), {
      timeout: 15_000,
    })
    .toMatch(ARTWORK_STATE);
});

test('keeps the footer controls interactive', async ({ page }) => {
  const { footer } = await openArtwork(page);
  const link = footer.getByRole('link').first();

  await expect(link).toBeVisible();

  const isClickable = await link.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const hit = document.elementFromPoint(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
    );

    return hit === element || element.contains(hit);
  });

  expect(isClickable).toBe(true);
});

test('morphs the wall colours over time', async ({ page }) => {
  const { artwork } = await openArtwork(page);
  const state = await artwork.getAttribute('data-artwork-state');

  test.skip(state === 'failed', 'WebGL is unavailable in this browser');

  const before = await artwork.screenshot({ animations: 'allow' });

  await page.waitForTimeout(1300);

  const after = await artwork.screenshot({ animations: 'allow' });

  expect(Buffer.compare(before, after)).not.toBe(0);
});

test('keeps a single still frame under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });

  const { artwork } = await openArtwork(page);
  const state = await artwork.getAttribute('data-artwork-state');

  test.skip(state === 'failed', 'WebGL is unavailable in this browser');

  await page.waitForTimeout(300);
  const before = await artwork.screenshot();
  await page.waitForTimeout(1200);
  const after = await artwork.screenshot();

  expect(Buffer.compare(before, after)).toBe(0);
});

test('falls back to the static wall when WebGL is unavailable', async ({
  page,
}) => {
  await page.addInitScript(() => {
    type GetContext = HTMLCanvasElement['getContext'];
    const original = HTMLCanvasElement.prototype.getContext;

    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<GetContext>
    ) {
      const contextId = args[0];

      if (
        contextId === 'webgl' ||
        contextId === 'webgl2' ||
        contextId === 'experimental-webgl'
      ) {
        return null;
      }

      return original.call(this, ...args);
    } as GetContext;
  });

  const { artwork } = await openArtwork(page);

  await expect(artwork).toHaveAttribute('data-artwork-state', 'failed');

  const fallbackOpacity = await page
    .locator('.footer-artwork-fallback')
    .evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).opacity),
    );
  const canvasOpacity = await page
    .locator('.footer-artwork-canvas')
    .evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).opacity),
    );

  expect(fallbackOpacity).toBe(1);
  expect(canvasOpacity).toBe(0);
});
