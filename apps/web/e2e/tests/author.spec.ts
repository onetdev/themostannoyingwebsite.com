import { expect, test } from '@playwright/test';

import { getArticlePage } from '../pages/ArticlePage';
import { getAuthorPage } from '../pages/AuthorPage';
import { getHomePage } from '../pages/HomePage';
import { fetchFirstShort } from '../utils/content-api';
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

test('author profile lists their shorts and opens the player', async ({
  page,
  request,
}) => {
  const short = await fetchFirstShort(request);
  test.skip(short === undefined, 'The Content API does not expose shorts yet.');

  if (!short) {
    return;
  }

  await setupE2eTestState(page);
  await page.goto(`/en/authors/${short.author.slug}/`);

  const authorPage = getAuthorPage(page);
  await expect(authorPage.authorItem).toBeVisible();
  await expect(authorPage.shortsSection).toBeVisible();
  await expect(authorPage.shortItems.first()).toBeVisible();

  await authorPage.shortItems.first().click();
  await expect(page).toHaveURL(/\/en\/shorts\/[^/]+\/$/);
  await expect(page.getByTestId('short-player-page')).toBeVisible();
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
