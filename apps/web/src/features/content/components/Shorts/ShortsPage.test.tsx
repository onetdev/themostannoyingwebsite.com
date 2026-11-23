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
    const html = renderToStaticMarkup(await ShortsPage({ shorts }));

    expect(html).toContain('data-testid="shorts-page"');
    expect(html).toContain('data-testid="short-grid-mock"');
    expect(html).toContain('count:2');
    expect(html).not.toContain('data-testid="shorts-empty"');
  });

  it('renders the empty state when no shorts are available', async () => {
    const html = renderToStaticMarkup(await ShortsPage({ shorts: [] }));

    expect(html).toContain('data-testid="shorts-empty"');
    expect(html).not.toContain('data-testid="short-grid-mock"');
  });
});
