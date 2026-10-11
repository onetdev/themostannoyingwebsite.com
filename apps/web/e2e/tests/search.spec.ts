import { expect, test } from '@playwright/test';

import { allDisabledPainPreferencesState } from '../fixtures/pain-preferences';
import { getSearchPage } from '../pages/SearchPage';
import { setupE2eTestState } from '../utils/setup';
import { setPainPreferences } from '../utils/zustand';

test('search page loads', { tag: '@smoke' }, async ({ page }) => {
  await setupE2eTestState(page);
  const searchPage = getSearchPage(page);
  await searchPage.goto();

  await expect(searchPage.headline).toBeVisible();
  await expect(searchPage.emptyState).toBeVisible();
});

test('performing a search renders results and the result meta', async ({
  page,
}) => {
  await setupE2eTestState(page);
  const searchPage = getSearchPage(page);
  await searchPage.goto();

  await searchPage.search('the');

  await expect(searchPage.resultMeta).toBeVisible();
  await expect(searchPage.resultItems.first()).toBeVisible();
  await expect(searchPage.emptyState).toBeHidden();
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
