import type { ComponentProps } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PaginationControls } from './PaginationControls';

jest.mock('next-intl/server', () => ({
  getTranslations: async () => {
    const messages: Record<string, string> = {
      previous: 'Previous',
      previousLabel: 'Previous page',
      next: 'Next',
      nextLabel: 'Next page',
      page: 'Page {page}',
      ellipsis: 'More pages',
    };

    return (key: string, values?: { page?: number }) =>
      key === 'page' && values?.page !== undefined
        ? `Page ${values.page}`
        : (messages[key] ?? key);
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

const hrefForPage = (page: number) =>
  page === 1 ? '/articles' : `/articles/page/${page}`;

const renderPagination = async (
  overrides: { currentPage?: number; pageCount?: number } = {},
) =>
  renderToStaticMarkup(
    await PaginationControls({
      currentPage: 5,
      pageCount: 10,
      hrefForPage,
      label: 'Article pagination',
      section: 'content:articles:pagination',
      ...overrides,
    }),
  );

describe('PaginationControls', () => {
  it('renders a windowed page list around the current page', async () => {
    const html = await renderPagination();

    expect(html).toContain('data-testid="pagination"');
    expect(html).toContain('data-track-section="content:articles:pagination"');
    expect(html).toContain('aria-current="page"');
    expect(html).toMatch(/data-testid="pagination-current"[^>]*>5</);
    expect(html).toContain('href="/articles/page/4"');
    expect(html).toContain('rel="prev"');
    expect(html).toContain('href="/articles/page/6"');
    expect(html).toContain('rel="next"');
    expect(html).toContain('href="/articles"');
    expect(html).toContain('href="/articles/page/10"');
    expect(html.match(/…/g)).toHaveLength(2);
  });

  it('adds semantic telemetry keys scoped to the configured section', async () => {
    const html = await renderPagination();

    expect(html).toContain('data-track="content:articles:pagination:previous"');
    expect(html).toContain('data-track="content:articles:pagination:next"');
    expect(html).toContain('data-track="content:articles:pagination:page"');
    expect(html).toContain('data-track-key="5"');
  });

  it('disables the previous control on the first page', async () => {
    const html = await renderPagination({ currentPage: 1, pageCount: 5 });

    expect(html).toContain('data-testid="pagination-previous"');
    expect(html).toContain('data-disabled="true"');
    expect(html).toContain('aria-disabled="true"');
    expect(html).not.toContain('rel="prev"');
    expect(html).toContain('href="/articles/page/2"');
    expect(html).toContain('rel="next"');
    expect(html).toContain('data-track="content:articles:pagination:next"');
  });

  it('disables the next control on the last page', async () => {
    const html = await renderPagination({ currentPage: 5, pageCount: 5 });

    expect(html).toContain('data-testid="pagination-next"');
    expect(html).toContain('data-disabled="true"');
    expect(html).toContain('aria-disabled="true"');
    expect(html).not.toContain('rel="next"');
    expect(html).toContain('rel="prev"');
  });

  it('uses the accessible labels for every control', async () => {
    const html = await renderPagination({ currentPage: 2, pageCount: 3 });

    expect(html).toContain('aria-label="Article pagination"');
    expect(html).toContain('aria-label="Previous page"');
    expect(html).toContain('aria-label="Next page"');
    expect(html).toContain('aria-label="Page 1"');
    expect(html).toContain('title="Page 2"');
    expect(html).toContain('aria-current="page"');
  });
});
