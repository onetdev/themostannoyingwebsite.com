import { expect, test } from '@playwright/test';

import { getHomePage } from '../pages/HomePage';
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
