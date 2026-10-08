import type { ArticleListItem } from '@maw/content-sdk';
import { renderToStaticMarkup } from 'react-dom/server';
import { ArticleTags } from './ArticleTags';

const article = {
  tags: ['memes', 'internet', 'humor'],
} as unknown as ArticleListItem;

describe('ArticleTags', () => {
  it('renders every tag in a single non-wrapping row', () => {
    const html = renderToStaticMarkup(<ArticleTags article={article} />);

    expect(html).toContain('data-testid="article-tags"');
    expect(html).toContain('memes');
    expect(html).toContain('internet');
    expect(html).toContain('humor');
    expect(html).toContain('flex-nowrap');
  });

  it('renders nothing when the article has no tags', () => {
    const html = renderToStaticMarkup(
      <ArticleTags article={{ tags: [] } as unknown as ArticleListItem} />,
    );

    expect(html).toBe('');
  });
});
