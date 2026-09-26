import { expect, type Page, test } from '@playwright/test';

import { getAboutPage } from '../pages/AboutPage';
import { getArticlePage } from '../pages/ArticlePage';
import { getHomePage } from '../pages/HomePage';
import { getPlansPage } from '../pages/PlansPage';
import { getSearchPage } from '../pages/SearchPage';
import { setupE2eTestState } from '../utils/setup';

type JsonLdNode = Record<string, unknown>;

const isJsonLdNode = (value: unknown): value is JsonLdNode =>
  typeof value === 'object' && value !== null;

const getJsonLdNodes = async (page: Page): Promise<JsonLdNode[]> => {
  const contents = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();

  return contents.flatMap((content) => {
    const parsed: unknown = JSON.parse(content);
    if (isJsonLdNode(parsed) && Array.isArray(parsed['@graph'])) {
      return (parsed['@graph'] as unknown[]).filter(isJsonLdNode);
    }
    return isJsonLdNode(parsed) ? [parsed] : [];
  });
};

const findByType = (nodes: JsonLdNode[], type: string) =>
  nodes.find((node) => node['@type'] === type);

test('home exposes website, organization and blog structured data', async ({
  page,
}) => {
  await setupE2eTestState(page);
  await getHomePage(page).goto();

  const nodes = await getJsonLdNodes(page);

  expect(findByType(nodes, 'Organization')).toBeDefined();
  expect(findByType(nodes, 'WebSite')).toBeDefined();

  const blog = findByType(nodes, 'Blog');
  expect(blog).toBeDefined();
  expect(Array.isArray(blog?.blogPost)).toBe(true);
});

test('about page exposes AboutPage structured data', async ({ page }) => {
  await setupE2eTestState(page);
  await getAboutPage(page).goto();

  const about = findByType(await getJsonLdNodes(page), 'AboutPage');

  expect(about).toBeDefined();
  expect(about?.['@id']).toMatch(/\/en\/about\/$/);
  expect(about?.inLanguage).toBe('en');
});

test('plans page exposes an ItemList of Product offers', async ({ page }) => {
  await setupE2eTestState(page);
  await getPlansPage(page).goto();

  const list = findByType(await getJsonLdNodes(page), 'ItemList');

  expect(list).toBeDefined();
  const itemListElement = list?.itemListElement as unknown[];
  expect(Array.isArray(itemListElement)).toBe(true);
  expect(itemListElement.length).toBeGreaterThanOrEqual(1);
});

test('article page exposes BlogPosting structured data', async ({ page }) => {
  await setupE2eTestState(page);
  const homePage = getHomePage(page);
  await homePage.goto();
  await homePage.coverArticle.locator('a').click();

  const articlePage = getArticlePage(page);
  await expect(articlePage.articleItem).toBeVisible();

  const posting = findByType(await getJsonLdNodes(page), 'BlogPosting');

  expect(posting).toBeDefined();
  expect(typeof posting?.headline).toBe('string');
  expect(posting?.publisher).toEqual({
    '@id': 'https://www.themostannoyingwebsite.com/#organization',
  });
});

test('search page is marked noindex', async ({ page }) => {
  await setupE2eTestState(page);
  await getSearchPage(page).goto();

  const robots = page.locator('meta[name="robots"]');
  await expect(robots).toHaveAttribute('content', /noindex/);
});
