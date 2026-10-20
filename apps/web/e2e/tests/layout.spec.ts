import { expect, test } from '@playwright/test';

import { getHomePage } from '../pages/HomePage';
import { setupE2eTestState } from '../utils/setup';

test('opening the domain should redirect to /en', { tag: '@smoke' }, async ({
  page,
}) => {
  await setupE2eTestState(page);
  await page.goto('/');
  await expect(page).toHaveURL('/en/');
  await expect(page).toHaveTitle(/The Most Annoying Website/);
});

test('layout elements should be present', { tag: '@smoke' }, async ({
  page,
}) => {
  await setupE2eTestState(page);
  const homePage = getHomePage(page);
  await homePage.goto();

  await expect(homePage.header).toBeVisible();
  await expect(homePage.searchForm).toBeVisible();
  await expect(homePage.footer).toBeVisible();
});

test('page content should span the floating header width', async ({ page }) => {
  await setupE2eTestState(page);
  const homePage = getHomePage(page);
  await homePage.goto();

  const mainBox = await page.locator('main').boundingBox();
  const headerBox = await homePage.header.boundingBox();
  const padding = await page.locator('main').evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      start: Number.parseFloat(styles.paddingInlineStart),
      end: Number.parseFloat(styles.paddingInlineEnd),
    };
  });

  expect(mainBox).not.toBeNull();
  expect(headerBox).not.toBeNull();

  if (!mainBox || !headerBox) {
    throw new Error('Unable to measure the header and main layout boxes');
  }

  // The floating header card shares its outer inline edges with the padded
  // content column, so the page body is as wide as the header.
  expect(headerBox.x).toBeCloseTo(mainBox.x + padding.start, 0);
  expect(headerBox.x + headerBox.width).toBeCloseTo(
    mainBox.x + mainBox.width - padding.end,
    0,
  );
});

test('narrow pages center their column horizontally', async ({ page }) => {
  await setupE2eTestState(page);
  await page.goto('/en/user/login');

  const column = page.locator('[data-narrow-content]');
  await expect(column).toBeVisible();

  const mainBox = await page.locator('main').boundingBox();
  const columnBox = await column.boundingBox();

  expect(mainBox).not.toBeNull();
  expect(columnBox).not.toBeNull();

  if (!mainBox || !columnBox) {
    throw new Error('Unable to measure the narrow layout boxes');
  }

  const startGap = columnBox.x - mainBox.x;
  const endGap = mainBox.x + mainBox.width - (columnBox.x + columnBox.width);

  // `mx-auto` on the column must win over the page layout's `mx-gutter` inset,
  // leaving equal free space on both sides instead of hugging the left edge.
  expect(startGap).toBeGreaterThan(0);
  expect(startGap).toBeCloseTo(endGap, 0);
});

test('narrow pages cap their column width on desktop', async ({ page }) => {
  await setupE2eTestState(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/en/user/signup');

  const column = page.locator('[data-narrow-content]');
  await expect(column).toBeVisible();

  const columnBox = await column.boundingBox();

  expect(columnBox).not.toBeNull();
  if (!columnBox) {
    throw new Error('Unable to measure the narrow layout column');
  }

  // Signup uses a wider 900px column on desktop, but still well below the
  // viewport width so it stays centered.
  expect(columnBox.width).toBeCloseTo(900, 0);
});
