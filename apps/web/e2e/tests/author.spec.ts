import { expect, test } from '@playwright/test';

import { getArticlePage } from '../pages/ArticlePage';
import { getAuthorPage } from '../pages/AuthorPage';
import { getHomePage } from '../pages/HomePage';
import { setupE2eTestState } from '../utils/setup';

test('article byline links to the author profile', async ({ page }) => {
  await setupE2eTestState(page);
  const homePage = getHomePage(page);
  await homePage.goto();
  await homePage.coverArticle.locator('a').click();

  const articlePage = getArticlePage(page);
  await expect(articlePage.articleItem).toBeVisible();

  await articlePage.articleItem.locator('a[href*="/authors/"]').click();

  const authorPage = getAuthorPage(page);
  await expect(authorPage.authorItem).toBeVisible();
  await expect(page).toHaveURL(/\/en\/authors\/[^/]+\/$/);
  await expect(authorPage.headline).not.toBeEmpty();
  await expect(authorPage.persona).not.toBeEmpty();
  await expect(authorPage.about).not.toBeEmpty();
  // The author of the clicked article always has at least one article in `en`.
  await expect(authorPage.articleItems.first()).toBeVisible();
});

test('sitemap includes author profiles with hreflang alternates', async ({
  request,
}) => {
  const response = await request.get('/sitemap.xml');

  expect(response.ok()).toBeTruthy();

  const xml = await response.text();
  expect(xml).toContain('/authors/');
  expect(xml).toContain('hreflang');
});
