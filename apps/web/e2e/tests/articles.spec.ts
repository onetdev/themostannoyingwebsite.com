import { expect, test } from '@playwright/test';

import { getArticlesPage } from '../pages/ArticlesPage';
import { setupE2eTestState } from '../utils/setup';

test('articles archive shows the full grid and active navigation', {
  tag: '@sanity',
}, async ({ page }) => {
  await setupE2eTestState(page);
  const articlesPage = getArticlesPage(page);
  await articlesPage.goto();

  await expect(articlesPage.activeMenuItem).toHaveText('Articles');
  await expect(articlesPage.headline).toBeVisible();
  await expect(articlesPage.articleList).toBeVisible();
  await expect(articlesPage.pageInfo).toContainText('articles');

  const itemCount = await articlesPage.articleItems.count();
  expect(itemCount).toBeGreaterThan(0);
  expect(itemCount).toBeLessThanOrEqual(16);
});

test('articles archive paginates when there is more than one page', async ({
  page,
}) => {
  await setupE2eTestState(page);
  const articlesPage = getArticlesPage(page);
  await articlesPage.goto();

  const paginationCount = await articlesPage.pagination.count();

  if (paginationCount === 0) {
    test.skip(true, 'The archive currently fits on a single page.');
  }

  await expect(articlesPage.currentPage).toHaveText('1');
  await expect(articlesPage.previousPage).toHaveAttribute(
    'data-disabled',
    'true',
  );

  const firstPageFirstTitle = await articlesPage.articleItems
    .first()
    .getByRole('heading')
    .textContent();

  await articlesPage.nextPage.click();

  await expect(page).toHaveURL(/\/en\/articles\/page\/2\/$/);
  await expect(articlesPage.currentPage).toHaveText('2');
  await expect(articlesPage.previousPage).not.toHaveAttribute(
    'data-disabled',
    'true',
  );

  const secondPageFirstTitle = await articlesPage.articleItems
    .first()
    .getByRole('heading')
    .textContent();

  expect(secondPageFirstTitle).not.toBe(firstPageFirstTitle);
});
