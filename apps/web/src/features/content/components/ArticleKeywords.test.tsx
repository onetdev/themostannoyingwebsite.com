import type { ArticleListItem } from '@maw/content-sdk';
import { renderToStaticMarkup } from 'react-dom/server';
import { ArticleKeywords } from './ArticleKeywords';

const article = {
  keywords: ['climate', 'internet', 'humor'],
} as unknown as ArticleListItem;

describe('ArticleKeywords', () => {
  it('renders every keyword in a wrapping row of pills', () => {
    const html = renderToStaticMarkup(<ArticleKeywords article={article} />);

    expect(html).toContain('data-testid="article-keywords"');
    expect(html).toContain('climate');
    expect(html).toContain('internet');
    expect(html).toContain('humor');
    expect(html).toContain('flex-wrap');
  });

  it('renders nothing when the article has no keywords', () => {
    const html = renderToStaticMarkup(
      <ArticleKeywords
        article={{ keywords: [] } as unknown as ArticleListItem}
      />,
    );

    expect(html).toBe('');
  });
});
