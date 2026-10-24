import type { ArticleListItem } from '@maw/content-sdk';
import type { ComponentProps } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ArticlesPage } from './ArticlesPage';

jest.mock('next-intl/server', () => ({
  getTranslations: async (
    namespace: string | { namespace?: string } | undefined,
  ) => {
    const prefix =
      typeof namespace === 'string' ? namespace : namespace?.namespace;

    return (key: string, values?: Record<string, unknown>) =>
      values
        ? `${prefix}.${key}:${JSON.stringify(values)}`
        : `${prefix}.${key}`;
  },
  getLocale: async () => 'en',
}));

jest.mock('@/core/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    ...rest
  }: ComponentProps<'a'> & { href: string }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

jest.mock('@/features/share/components', () => ({
  ShareButton: () => null,
}));

jest.mock('@/components/PaginationControls', () => ({
  PaginationControls: ({
    currentPage,
    pageCount,
  }: {
    currentPage: number;
    pageCount: number;
  }) => (
    <nav
      data-testid="pagination"
      data-current={currentPage}
      data-page-count={pageCount}
    />
  ),
}));

jest.mock('./SmallCoverListItem', () => ({
  SmallCoverListItem: ({ article }: { article: { slug: string } }) => (
    <div data-testid="articles-list-item">{article.slug}</div>
  ),
}));

const articles = Array.from({ length: 16 }, (_, index) => ({
  id: `article-${index + 1}`,
  slug: `article-${index + 1}`,
})) as unknown as ArticleListItem[];

const hrefForPage = (page: number) =>
  page === 1 ? '/articles' : `/articles/page/${page}`;

describe('ArticlesPage', () => {
  it('renders the archive grid, range and pagination', async () => {
    const html = renderToStaticMarkup(
      await ArticlesPage({
        articles,
        currentPage: 1,
        pageCount: 3,
        total: 40,
        offset: 0,
        hrefForPage,
      }),
    );

    expect(html).toContain('data-testid="articles-page"');
    expect(html).toContain('data-testid="articles-list"');
    expect(html.match(/data-testid="articles-list-item"/g)).toHaveLength(16);
    expect(html).toContain('content.articles.pageInfo');
    expect(html).toContain('data-testid="pagination"');
    expect(html).toContain('data-current="1"');
  });

  it('renders an empty state without pagination when there are no articles', async () => {
    const html = renderToStaticMarkup(
      await ArticlesPage({
        articles: [],
        currentPage: 1,
        pageCount: 1,
        total: 0,
        offset: 0,
        hrefForPage,
      }),
    );

    expect(html).toContain('data-testid="articles-empty"');
    expect(html).not.toContain('data-testid="articles-list"');
    expect(html).not.toContain('data-testid="pagination"');
  });

  it('highlights the current page on later pages', async () => {
    const html = renderToStaticMarkup(
      await ArticlesPage({
        articles,
        currentPage: 2,
        pageCount: 3,
        total: 40,
        offset: 16,
        hrefForPage,
      }),
    );

    expect(html).toContain('data-current="2"');
    expect(html).toContain('data-page-count="3"');
  });
});
