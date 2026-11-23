import type { ShortVideoListItem } from '@maw/content-sdk';
import { renderToStaticMarkup } from 'react-dom/server';

import { HomeShorts } from './HomeShorts';

jest.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => key,
}));

jest.mock('@/features/content/components/Shorts/ShortCarousel', () => ({
  ShortCarousel: () => <div data-testid="short-carousel" />,
}));

const shorts = [
  { id: 'short-1', slug: 'first-clip' },
] as unknown as ShortVideoListItem[];

describe('HomeShorts', () => {
  it('renders nothing when there are no shorts', async () => {
    const html = renderToStaticMarkup(await HomeShorts({ shorts: [] }));

    expect(html).toBe('');
  });

  it('renders the heading band and carousel when shorts exist', async () => {
    const html = renderToStaticMarkup(await HomeShorts({ shorts }));

    expect(html).toContain('data-testid="home-shorts"');
    expect(html).toContain('data-testid="short-carousel"');
    expect(html).toContain('archiveTitle');
  });
});
