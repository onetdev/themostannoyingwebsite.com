import { buildArticle } from './article';
import { buildBlog } from './blog';
import { buildDonateAction } from './donate-action';
import { buildSimpleItemList } from './item-list';
import { buildPlanList } from './plan-list';
import { buildSiteGraph } from './site-graph';
import { buildBreadcrumbList, buildWebPage } from './web-page';

const baseUrl = 'https://example.com';

type Record_ = Record<string, unknown>;
const asRecord = (value: unknown): Record_ => value as Record_;
const getArray = (value: unknown): Record_[] => value as Record_[];

describe('buildSiteGraph', () => {
  const graph = buildSiteGraph({
    baseUrl,
    locale: 'en',
    siteName: 'MAW',
    description: 'A description',
    logoUrl: '/assets/logo.png',
    sameAs: ['https://x.com/the_maw_og'],
    contactEmail: 'hello@example.com',
    searchPath: 'search',
  });

  it('emits an organization and website node', () => {
    expect(graph['@context']).toBe('https://schema.org');
    const types = getArray(graph['@graph']).map((node) => node['@type']);
    expect(types).toEqual(['Organization', 'WebSite']);
  });

  it('absolutizes the logo and propagates social profiles', () => {
    const organization = asRecord(graph['@graph'][0]);
    expect(organization.logo).toBe('https://example.com/assets/logo.png');
    expect(organization.email).toBe('hello@example.com');
    expect(organization.sameAs).toEqual(['https://x.com/the_maw_og']);
  });

  it('links the website to the organization and search action', () => {
    const website = asRecord(graph['@graph'][1]);
    expect(website.publisher).toEqual({
      '@id': 'https://example.com/#organization',
    });
    expect(website.url).toBe('https://example.com/en/');
    expect(website.inLanguage).toBe('en');

    const action = asRecord(website.potentialAction);
    expect(action['@type']).toBe('SearchAction');
    expect(asRecord(action.target).urlTemplate).toBe(
      'https://example.com/en/search/?q={search_term_string}',
    );
  });
});

describe('buildBreadcrumbList', () => {
  it('builds ordered list items with absolute urls', () => {
    const breadcrumb = buildBreadcrumbList(baseUrl, 'en', [
      { name: 'Home', path: '' },
      { name: 'About', path: 'about' },
    ]);

    const items = getArray(breadcrumb.itemListElement);
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://example.com/en/',
    });
    expect(items[1]).toMatchObject({
      position: 2,
      item: 'https://example.com/en/about/',
    });
  });
});

describe('buildWebPage', () => {
  it('defaults to WebPage and includes breadcrumbs', () => {
    const page = buildWebPage({
      baseUrl,
      locale: 'en',
      path: 'about',
      name: 'About',
      description: 'About us',
      breadcrumbs: [{ name: 'Home', path: '' }],
    });

    expect(page['@type']).toBe('WebPage');
    expect(page.url).toBe('https://example.com/en/about/');
    expect(page['@id']).toBe('https://example.com/en/about/');
    expect(page.isPartOf).toEqual({ '@id': 'https://example.com/en/#website' });
    expect(asRecord(page.breadcrumb)['@type']).toBe('BreadcrumbList');
  });

  it('supports the AboutPage and ContactPage subtypes', () => {
    expect(
      buildWebPage({
        baseUrl,
        locale: 'en',
        path: 'a',
        name: 'A',
        type: 'AboutPage',
      })['@type'],
    ).toBe('AboutPage');
    expect(
      buildWebPage({
        baseUrl,
        locale: 'en',
        path: 'c',
        name: 'C',
        type: 'ContactPage',
      })['@type'],
    ).toBe('ContactPage');
  });
});

describe('buildArticle', () => {
  it('builds a BlogPosting with absolute image and publisher reference', () => {
    const article = buildArticle({
      baseUrl,
      locale: 'hu',
      path: 'articles/hello',
      headline: 'Hello',
      description: 'Summary',
      image: '/assets/cover.png',
      datePublished: '2026-01-01T00:00:00.000Z',
      authorName: 'Jane',
      keywords: ['a', 'b'],
      articleSection: 'news',
    });

    expect(article['@type']).toBe('BlogPosting');
    expect(article['@id']).toBe('https://example.com/hu/articles/hello/');
    expect(article.mainEntityOfPage).toEqual({
      '@id': 'https://example.com/hu/articles/hello/',
    });
    expect(article.image).toBe('https://example.com/assets/cover.png');
    expect(article.author).toEqual({ '@type': 'Person', name: 'Jane' });
    expect(article.publisher).toEqual({
      '@id': 'https://example.com/#organization',
    });
    expect(article.keywords).toBe('a, b');
    expect(article.articleSection).toBe('news');
  });
});

describe('buildBlog', () => {
  it('lists posts as BlogPosting nodes', () => {
    const blog = buildBlog({
      baseUrl,
      locale: 'en',
      name: 'MAW',
      description: 'desc',
      posts: [
        {
          path: 'articles/one',
          headline: 'One',
          description: 'first',
          datePublished: '2026-01-01T00:00:00.000Z',
        },
      ],
    });

    expect(blog['@type']).toBe('Blog');
    expect(blog['@id']).toBe('https://example.com/en/#blog');
    const posts = getArray(blog.blogPost);
    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject({
      '@type': 'BlogPosting',
      url: 'https://example.com/en/articles/one/',
      headline: 'One',
    });
  });
});

describe('buildPlanList', () => {
  it('builds products with offers', () => {
    const list = buildPlanList({
      baseUrl,
      locale: 'en',
      path: 'plans',
      name: 'Plans',
      plans: [
        {
          key: 'poorified',
          name: 'Basic',
          description: 'Cheap',
          offers: [
            { billingCycle: 'monthly', price: 99, currency: 'EUR' },
            { billingCycle: 'yearly', price: 89, currency: 'EUR' },
          ],
        },
      ],
    });

    expect(list['@type']).toBe('ItemList');
    expect(list.numberOfItems).toBe(1);
    const item = asRecord(getArray(list.itemListElement)[0]);
    expect(item.position).toBe(1);
    const product = asRecord(item.item);
    expect(product['@type']).toBe('Product');
    expect(product.name).toBe('Basic');
    const offers = getArray(product.offers);
    expect(offers).toHaveLength(2);
    expect(offers[0]).toMatchObject({
      '@type': 'Offer',
      price: 99,
      priceCurrency: 'EUR',
    });
  });
});

describe('buildDonateAction', () => {
  it('points targets at the funding endpoints', () => {
    const action = buildDonateAction({
      baseUrl,
      locale: 'en',
      path: 'donate',
      name: 'Donate',
      description: 'Support us',
      targets: ['https://buymeacoffee.com/x', 'https://paypal.me/x'],
    });

    expect(action['@type']).toBe('DonateAction');
    expect(action.recipient).toEqual({
      '@id': 'https://example.com/#organization',
    });
    const targets = getArray(action.target);
    expect(targets).toHaveLength(2);
    expect(targets[0]).toMatchObject({
      '@type': 'EntryPoint',
      url: 'https://buymeacoffee.com/x',
    });
  });
});

describe('buildSimpleItemList', () => {
  it('builds named list items', () => {
    const list = buildSimpleItemList({
      baseUrl,
      locale: 'en',
      path: 'achievements',
      name: 'Achievements',
      items: [{ name: 'Welcome to Hell' }],
    });

    expect(list['@type']).toBe('ItemList');
    expect(list.numberOfItems).toBe(1);
    expect(getArray(list.itemListElement)[0]).toMatchObject({
      position: 1,
      name: 'Welcome to Hell',
    });
  });
});
