import { expect, test } from '@playwright/test';

import { getAdminPage } from '../pages/AdminPage';
import { getHomePage } from '../pages/HomePage';
import { setupE2eTestState } from '../utils/setup';

test('public pages render the animated backdrop', { tag: '@smoke' }, async ({
  page,
}) => {
  await setupE2eTestState(page);
  await getHomePage(page).goto();

  const backdrop = page.getByTestId('public-backdrop');

  await expect(backdrop).toBeVisible();
  await expect(backdrop).toHaveAttribute('aria-hidden', 'true');

  // Decorative layer: pinned to the viewport, behind content, and never
  // intercepting pointer events.
  await expect(backdrop).toHaveCSS('position', 'fixed');
  await expect(backdrop).toHaveCSS('pointer-events', 'none');
  await expect(backdrop).toHaveCSS('z-index', '-10');

  // The blobs themselves are painted by the shared `aurora-blob` utility.
  expect(await backdrop.locator('.aurora-blob').count()).toBeGreaterThan(0);
});

test('backdrop blobs stop animating under reduced motion', async ({ page }) => {
  await setupE2eTestState(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await getHomePage(page).goto();

  const blob = page
    .getByTestId('public-backdrop')
    .locator('.aurora-blob')
    .first();

  await expect(blob).toBeVisible();
  await expect(blob).toHaveCSS('animation-name', 'none');
});

test('barebone pages do not render the animated backdrop', async ({ page }) => {
  await setupE2eTestState(page);
  await getAdminPage(page).goto();

  await expect(page.getByTestId('public-backdrop')).toHaveCount(0);
});
