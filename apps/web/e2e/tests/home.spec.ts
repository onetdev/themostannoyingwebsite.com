import { expect, test } from '@playwright/test';

import { getHomePage } from '../pages/HomePage';
import { fetchFirstShort } from '../utils/content-api';
import { setupE2eTestState } from '../utils/setup';

test('home loads and has articles', { tag: '@sanity' }, async ({ page }) => {
  await setupE2eTestState(page);
  const homePage = getHomePage(page);
  await homePage.goto();

  await expect(homePage.activeMenuItem).toHaveText('Home');

  await expect(homePage.coverArticle).toBeVisible();

  const denseArticleItemsLength = await homePage.denseArticleList
    .getByTestId('dense-article-item')
    .count();
  expect(denseArticleItemsLength).toBeGreaterThanOrEqual(1);
  expect(denseArticleItemsLength).toBeLessThanOrEqual(2);

  const smallCoverArticleItemsLength = await homePage.smallCoverArticleList
    .getByTestId('small-cover-article-item')
    .count();
  expect(smallCoverArticleItemsLength).toBeGreaterThanOrEqual(1);
  expect(smallCoverArticleItemsLength).toBeLessThanOrEqual(12);
});

test('home surfaces shorts and links to the player', async ({
  page,
  request,
}) => {
  const short = await fetchFirstShort(request);
  test.skip(short === undefined, 'The Content API does not expose shorts yet.');

  if (!short) {
    return;
  }

  await setupE2eTestState(page);
  const homePage = getHomePage(page);
  await homePage.goto();

  await expect(homePage.shortsSection).toBeVisible();
  await expect(homePage.shortItems.first()).toBeVisible();
  await expect(homePage.shortsArchiveLink).toHaveAttribute(
    'href',
    /\/en\/shorts\/$/,
  );

  await homePage.shortItems.first().click();
  await expect(page).toHaveURL(/\/en\/shorts\/[^/]+\/$/);
  await expect(page.getByTestId('short-player-page')).toBeVisible();

  await page.getByRole('button', { name: 'Close player' }).click();
  await expect(page).toHaveURL(/\/en\/?$/);

  await homePage.shortsArchiveLink.click();
  await expect(page).toHaveURL(/\/en\/shorts\/$/);
});

test('home shorts carousel scrolls to the archive tile', async ({
  page,
  request,
}) => {
  const short = await fetchFirstShort(request);
  test.skip(short === undefined, 'The Content API does not expose shorts yet.');

  if (!short) {
    return;
  }

  await page.setViewportSize({ width: 900, height: 900 });
  await setupE2eTestState(page);
  const homePage = getHomePage(page);
  await homePage.goto();

  await expect(homePage.shortsNext).toBeVisible();
  await homePage.shortsNext.click();

  await expect(homePage.shortsPrevious).toBeVisible();
  await expect(homePage.shortsArchiveLink).toBeInViewport();
});

test('home links to the full article archive below the list', async ({
  page,
}) => {
  await setupE2eTestState(page);
  const homePage = getHomePage(page);
  await homePage.goto();

  await expect(homePage.articlesArchiveLink).toBeVisible();

  const lastArticle = homePage.smallCoverArticleList
    .getByTestId('small-cover-article-item')
    .last();
  const [linkBox, lastArticleBox] = await Promise.all([
    homePage.articlesArchiveLink.boundingBox(),
    lastArticle.boundingBox(),
  ]);

  expect(linkBox).not.toBeNull();
  expect(lastArticleBox).not.toBeNull();

  if (!linkBox || !lastArticleBox) {
    throw new Error('Unable to measure the archive link position');
  }

  expect(linkBox.y).toBeGreaterThan(lastArticleBox.y);

  await homePage.articlesArchiveLink.click();
  await expect(page).toHaveURL(/\/en\/articles\/$/);
});
