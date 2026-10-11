import type { ArticleListItem } from '@maw/content-sdk';
import { renderToStaticMarkup } from 'react-dom/server';
import { ArticleTagKeywords } from './ArticleTagKeywords';

const article = {
  tags: ['news', 'politics'],
  keywords: ['climate', 'internet'],
} as unknown as ArticleListItem;

describe('ArticleTagKeywords', () => {
  it('renders tags and keywords as one continuous list of pills', () => {
    const html = renderToStaticMarkup(<ArticleTagKeywords article={article} />);

    expect(html).toContain('data-testid="article-tag-keywords"');
    expect(html).toContain('flex-wrap');
    expect(html).toContain('news');
    expect(html).toContain('politics');
    expect(html).toContain('climate');
    expect(html).toContain('internet');
  });

  it('keeps the visual differentiation between tags and keywords', () => {
    const html = renderToStaticMarkup(<ArticleTagKeywords article={article} />);

    expect(html).toContain('data-variant="secondary"');
    expect(html).toContain('data-variant="outline"');
  });

  it('renders nothing when the article has neither tags nor keywords', () => {
    const html = renderToStaticMarkup(
      <ArticleTagKeywords
        article={{ tags: [], keywords: [] } as unknown as ArticleListItem}
      />,
    );

    expect(html).toBe('');
  });

  it('renders keywords even when the article has no tags', () => {
    const html = renderToStaticMarkup(
      <ArticleTagKeywords
        article={
          { tags: [], keywords: ['climate'] } as unknown as ArticleListItem
        }
      />,
    );

    expect(html).toContain('data-testid="article-tag-keywords"');
    expect(html).toContain('climate');
  });
});
