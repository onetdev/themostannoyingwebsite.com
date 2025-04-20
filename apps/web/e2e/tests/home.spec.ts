import { expect, test } from '@playwright/test';

test('home loads and has articles', { tag: '@sanity' }, async ({ page }) => {
  await page.goto('/');

  const header = page.getByRole('banner');
  await expect(header.locator('[aria-current="page"]')).toHaveText('Home');

  await expect(page.getByTestId('cover-article')).toBeVisible();

  const denseArticleItemsLength = await page
    .getByTestId('dense-article-item')
    .count();
  expect(denseArticleItemsLength).toBeGreaterThanOrEqual(1);
  expect(denseArticleItemsLength).toBeLessThanOrEqual(2);

  const smallCoverArticleItemsLength = await page
    .getByTestId('small-cover-article-item')
    .count();
  expect(smallCoverArticleItemsLength).toBeGreaterThanOrEqual(1);
  expect(smallCoverArticleItemsLength).toBeLessThanOrEqual(8);
});
