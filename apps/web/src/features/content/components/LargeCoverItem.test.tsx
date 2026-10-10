import type { ArticleListItem } from '@maw/content-sdk';
import { renderToStaticMarkup } from 'react-dom/server';
import { LargeCoverItem } from './LargeCoverItem';

jest.mock('@/core/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

const article = {
  slug: 'my-brain-is-broken',
  title: 'THE INTERNET IS BROKEN',
  summary: 'WARNING: The internet has officially lost its mind.',
  tags: ['memes', 'internet', 'humor'],
  author: { name: 'Jane Doe', slug: 'jane-doe' },
  published_at: '2024-01-02T00:00:00.000Z',
  reading_time_minutes: 5,
} as unknown as ArticleListItem;

describe('LargeCoverItem', () => {
  it('renders only the tags and the title', () => {
    const html = renderToStaticMarkup(<LargeCoverItem article={article} />);

    expect(html).toContain('data-testid="article-tags"');
    expect(html).toContain('memes');
    expect(html).toContain('THE INTERNET IS BROKEN');
  });

  it('omits the summary and the article meta', () => {
    const html = renderToStaticMarkup(<LargeCoverItem article={article} />);

    expect(html).not.toContain(article.summary);
    expect(html).not.toContain('data-testid="article-meta"');
  });
});
