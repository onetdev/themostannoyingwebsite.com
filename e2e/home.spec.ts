import { expect, test } from '@playwright/test';

test('home has articles', async ({ page }) => {
  await page.goto('/');

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
