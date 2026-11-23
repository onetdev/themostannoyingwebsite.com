import { expect, test } from '@playwright/test';

import { allDisabledPainPreferencesState } from '../fixtures/pain-preferences';
import { getSearchPage } from '../pages/SearchPage';
import { fetchFirstShort } from '../utils/content-api';
import { setupE2eTestState } from '../utils/setup';
import { setPainPreferences } from '../utils/zustand';

test('search page loads', { tag: '@smoke' }, async ({ page }) => {
  await setupE2eTestState(page);
  const searchPage = getSearchPage(page);
  await searchPage.goto();

  await expect(searchPage.headline).toBeVisible();
  await expect(searchPage.emptyState).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/i,
  );
});

test('performing a search renders mixed results and the result meta', async ({
  page,
}) => {
  await setupE2eTestState(page);
  const searchPage = getSearchPage(page);
  await searchPage.goto();

  await searchPage.search('the');

  await expect(searchPage.resultMeta).toBeVisible();
  await expect(searchPage.resultItems.first()).toBeVisible();
  await expect(searchPage.shortResults.first()).toBeVisible();
  await expect(searchPage.emptyState).toBeHidden();
});

test('shows the no-results state when a query resolves empty', async ({
  page,
}) => {
  await setupE2eTestState(page);
  const searchPage = getSearchPage(page);
  await searchPage.goto();

  await searchPage.search('zzzzqqqqxyz');

  await expect(searchPage.noResults).toBeVisible();
  await expect(searchPage.resultMeta).toHaveText(/found 0 results/);
  await expect(searchPage.resultItems).toHaveCount(0);
  await expect(searchPage.emptyState).toBeHidden();
  await expect(searchPage.loadMore).toBeHidden();
});

test('shows the error alert and suppresses the other states when the search request fails', async ({
  page,
}) => {
  // Client-side retries make the final error state take a few seconds.
  test.setTimeout(45_000);

  await page.route('**/api/v1/search*', (route) =>
    route.fulfill({
      status: 400,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify({ error: 'SEARCH_UNAVAILABLE' }),
    }),
  );
  await setupE2eTestState(page);
  const searchPage = getSearchPage(page);
  await searchPage.goto();

  await searchPage.search('the');

  await expect(searchPage.errorAlert).toBeVisible({ timeout: 20_000 });
  await expect(searchPage.errorAlert).toContainText(
    'Search failed, please try again later',
  );
  await expect(searchPage.resultMeta).toBeHidden();
  await expect(searchPage.resultItems).toHaveCount(0);
  await expect(searchPage.emptyState).toBeHidden();
  await expect(searchPage.noResults).toBeHidden();
  await expect(searchPage.loadingMessages).toBeHidden();
  await expect(searchPage.skeleton).toBeHidden();
});

test('filters results by content type', async ({ page }) => {
  await setupE2eTestState(page);
  const searchPage = getSearchPage(page);
  await searchPage.goto();

  await searchPage.search('the');
  await expect(searchPage.shortResults.first()).toBeVisible();

  await searchPage.filterShorts.click();
  await expect(searchPage.shortResults.first()).toBeVisible();
  expect(await searchPage.resultItems.count()).toBe(
    await searchPage.shortResults.count(),
  );
  expect(await searchPage.articleResults.count()).toBe(0);

  await searchPage.filterArticles.click();
  await expect(searchPage.articleResults.first()).toBeVisible();
  expect(await searchPage.shortResults.count()).toBe(0);
});

test('loads more results in pages of ten', async ({ page }) => {
  await setupE2eTestState(page);
  const searchPage = getSearchPage(page);
  await searchPage.goto();

  await searchPage.search('the');
  await expect(searchPage.resultItems).toHaveCount(10);

  await searchPage.loadMore.click();
  await expect(searchPage.resultItems).toHaveCount(20);
});

test('short results open the player and return to the filtered search', async ({
  page,
  request,
}) => {
  const short = await fetchFirstShort(request);
  test.skip(short === undefined, 'The Content API does not expose shorts yet.');

  if (!short) {
    return;
  }

  const query = short.slug.split('-')[0];
  await setupE2eTestState(page);
  const searchPage = getSearchPage(page);
  await searchPage.goto();

  await searchPage.search(query);
  await searchPage.filterShorts.click();
  await expect(searchPage.shortResults.first()).toBeVisible();

  await searchPage.shortResults.first().getByRole('link').click();
  await expect(page).toHaveURL(/\/en\/shorts\/[^/]+\/$/);
  await expect(page.getByTestId('short-player-page')).toBeVisible();

  await page.getByRole('button', { name: 'Close player' }).click();
  await expect(page).toHaveURL(
    new RegExp(`/en/search/\\?q=${query}&type=short$`),
  );
  await expect(searchPage.shortResults.first()).toBeVisible();
});

test('page results link to their static page', async ({ page }) => {
  await setupE2eTestState(page);
  const searchPage = getSearchPage(page);
  await searchPage.goto();

  await searchPage.search('privacy');
  await expect(searchPage.pageResults.first()).toBeVisible();

  await searchPage.pageResults.first().getByRole('link').click();
  await expect(page).toHaveURL(/\/en\/privacy-policy\/$/);
});

test('a new query resets the filter to all', async ({ page }) => {
  await setupE2eTestState(page);
  const searchPage = getSearchPage(page);
  await searchPage.goto();

  await searchPage.search('the');
  await searchPage.filterShorts.click();
  await expect(page).toHaveURL(/type=short/);

  await searchPage.search('privacy');
  await expect(page).not.toHaveURL(/type=/);
  await expect(searchPage.filterAll).toHaveAttribute('aria-selected', 'true');
  await expect(searchPage.pageResults.first()).toBeVisible();
});

test('shows the skeleton only when the artificial search delay is enabled', async ({
  page,
}) => {
  await setPainPreferences(page, {
    ...allDisabledPainPreferencesState,
    flags: { ...allDisabledPainPreferencesState.flags, searchDelay: true },
  });
  const searchPage = getSearchPage(page);
  await searchPage.goto();

  await searchPage.search('the');

  await expect(searchPage.loadingMessages).toBeVisible();
  await expect(searchPage.skeleton).toBeVisible();

  // The spinner and the status text must share a vertical center (the
  // FontAwesome inline-SVG baseline offset used to push the icon out of line).
  const icon = await searchPage.loadingIcon.boundingBox();
  const text = await searchPage.loadingText.boundingBox();
  expect(icon).not.toBeNull();
  expect(text).not.toBeNull();
  if (icon && text) {
    const iconCenter = icon.y + icon.height / 2;
    const textCenter = text.y + text.height / 2;
    expect(Math.abs(iconCenter - textCenter)).toBeLessThan(2);
  }

  // The artificial delay eventually resolves into real results.
  await expect(searchPage.resultItems.first()).toBeVisible({
    timeout: 20_000,
  });
});
