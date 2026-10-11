import type { ArticleListItem } from '@maw/content-sdk';
import { renderToStaticMarkup } from 'react-dom/server';
import { ArticleCategoryKeywords } from './ArticleCategoryKeywords';

const article = {
  categories: [
    { id: 'news', label: 'News' },
    { id: 'politics', label: 'Politics' },
  ],
  keywords: ['climate', 'internet'],
} as unknown as ArticleListItem;

describe('ArticleCategoryKeywords', () => {
  it('renders categories and keywords as one continuous list of pills', () => {
    const html = renderToStaticMarkup(
      <ArticleCategoryKeywords article={article} />,
    );

    expect(html).toContain('data-testid="article-category-keywords"');
    expect(html).toContain('flex-wrap');
    expect(html).toContain('News');
    expect(html).toContain('Politics');
    expect(html).toContain('climate');
    expect(html).toContain('internet');
  });

  it('keeps the visual differentiation between categories and keywords', () => {
    const html = renderToStaticMarkup(
      <ArticleCategoryKeywords article={article} />,
    );

    expect(html).toContain('data-variant="secondary"');
    expect(html).toContain('data-variant="outline"');
  });

  it('renders nothing when the article has neither categories nor keywords', () => {
    const html = renderToStaticMarkup(
      <ArticleCategoryKeywords
        article={{ categories: [], keywords: [] } as unknown as ArticleListItem}
      />,
    );

    expect(html).toBe('');
  });

  it('renders keywords even when the article has no categories', () => {
    const html = renderToStaticMarkup(
      <ArticleCategoryKeywords
        article={
          {
            categories: [],
            keywords: ['climate'],
          } as unknown as ArticleListItem
        }
      />,
    );

    expect(html).toContain('data-testid="article-category-keywords"');
    expect(html).toContain('climate');
  });
});
