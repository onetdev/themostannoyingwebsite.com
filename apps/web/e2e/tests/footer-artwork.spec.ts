import { expect, test } from '@playwright/test';

import { getHomePage } from '../pages/HomePage';
import { setupE2eTestState } from '../utils/setup';

test('renders the artwork directly below the footer', {
  tag: '@smoke',
}, async ({ page }) => {
  await setupE2eTestState(page);
  await getHomePage(page).goto();

  const artwork = page.getByTestId('footer-artwork');
  await artwork.scrollIntoViewIfNeeded();

  await expect(artwork).toBeVisible();
  await expect(artwork).toHaveAttribute('aria-hidden', 'true');

  // The drifting planes are oversized, so the band must clip them instead of
  // letting them contribute to the page's scrollable area.
  await expect(artwork).toHaveCSS('overflow', 'hidden');

  const footerBox = await page.getByRole('contentinfo').boundingBox();
  const artworkBox = await artwork.boundingBox();

  expect(footerBox).not.toBeNull();
  expect(artworkBox).not.toBeNull();

  if (!footerBox || !artworkBox) {
    throw new Error('Unable to measure the footer and artwork boxes');
  }

  expect(artworkBox.y).toBeGreaterThanOrEqual(footerBox.y + footerBox.height);
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

test('freezes the artwork under reduced motion', async ({ page }) => {
  await setupE2eTestState(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await getHomePage(page).goto();

  const artwork = page.getByTestId('footer-artwork');

  await expect(artwork.locator('.panel-plane').first()).toHaveCSS(
    'animation-name',
    'none',
  );
  await expect(artwork.locator('.panel-mullion').first()).toHaveCSS(
    'animation-name',
    'none',
  );
  await expect(artwork.locator('.panel-sweep')).toHaveCSS(
    'animation-name',
    'none',
  );
});
