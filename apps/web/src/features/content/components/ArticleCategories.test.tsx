import type { ArticleListItem } from '@maw/content-sdk';
import { renderToStaticMarkup } from 'react-dom/server';
import { ArticleCategories } from './ArticleCategories';

const article = {
  categories: [
    { id: 'memes', label: 'Memes' },
    { id: 'internet', label: 'Internet' },
    { id: 'humor', label: 'Humor' },
  ],
} as unknown as ArticleListItem;

describe('ArticleCategories', () => {
  it('renders every category in a single non-wrapping row', () => {
    const html = renderToStaticMarkup(<ArticleCategories article={article} />);

    expect(html).toContain('data-testid="article-categories"');
    expect(html).toContain('Memes');
    expect(html).toContain('Internet');
    expect(html).toContain('Humor');
    expect(html).toContain('flex-nowrap');
  });

  it('renders nothing when the article has no categories', () => {
    const html = renderToStaticMarkup(
      <ArticleCategories
        article={{ categories: [] } as unknown as ArticleListItem}
      />,
    );

    expect(html).toBe('');
  });
});
