import type { ShortListItem } from '@maw/content-sdk';
import { renderToStaticMarkup } from 'react-dom/server';

import { ShortsPage } from './ShortsPage';

jest.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string, values?: { count?: number }) =>
    values?.count !== undefined ? `${key}:${values.count}` : key,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('@/features/share/components', () => ({
  ShareButton: () => null,
}));

jest.mock('@/components/PaginationControls', () => ({
  PaginationControls: ({ pageCount }: { pageCount: number }) => (
    <div data-testid="pagination-mock">{pageCount}</div>
  ),
}));

jest.mock('./ShortGrid', () => ({
  ShortGrid: ({ shorts }: { shorts: ShortListItem[] }) => (
    <div data-testid="short-grid-mock">{shorts.length}</div>
  ),
}));

const shorts = [
  { id: 'a', slug: 'a' },
  { id: 'b', slug: 'b' },
] as unknown as ShortListItem[];

describe('ShortsPage', () => {
  it('renders the archive grid and count when shorts exist', async () => {
    const html = renderToStaticMarkup(
      await ShortsPage({
        shorts,
        currentPage: 1,
        pageCount: 1,
        total: shorts.length,
        hrefForPage: (page) => `/shorts/page/${page}`,
      }),
    );

    expect(html).toContain('data-testid="shorts-page"');
    expect(html).toContain('data-testid="short-grid-mock"');
    expect(html).toContain('count:2');
    expect(html).not.toContain('data-testid="shorts-empty"');
  });

  it('renders pagination when there are multiple pages', async () => {
    const html = renderToStaticMarkup(
      await ShortsPage({
        shorts,
        currentPage: 2,
        pageCount: 3,
        total: 50,
        hrefForPage: (page) => `/shorts/page/${page}`,
      }),
    );

    expect(html).toContain('data-testid="pagination-mock"');
  });

  it('renders the empty state when no shorts are available', async () => {
    const html = renderToStaticMarkup(
      await ShortsPage({
        shorts: [],
        currentPage: 1,
        pageCount: 1,
        total: 0,
        hrefForPage: (page) => `/shorts/page/${page}`,
      }),
    );

    expect(html).toContain('data-testid="shorts-empty"');
    expect(html).not.toContain('data-testid="short-grid-mock"');
  });
});
