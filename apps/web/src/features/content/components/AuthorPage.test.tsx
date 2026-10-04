import type { ArticleListItem, Author } from '@maw/content-sdk';
import { renderToStaticMarkup } from 'react-dom/server';
import { AuthorPage } from './AuthorPage';

jest.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string, values?: { name?: string }) =>
    values?.name ? `${key}:${values.name}` : key,
}));

jest.mock('./SmallCoverListItem', () => ({
  SmallCoverListItem: ({ article }: { article: { slug: string } }) => (
    <div data-testid="author-article-item">{article.slug}</div>
  ),
}));

const author: Author = {
  id: 'aedc2c33-3760-5957-ac6b-e671cef72ff3',
  slug: 'jane-doe',
  name: 'Jane Doe',
  persona: 'The Tester',
  about: 'Jane writes about tests and testing culture.',
};

const articles = [
  { id: 'article-1', slug: 'first-post' },
  { id: 'article-2', slug: 'second-post' },
] as unknown as ArticleListItem[];

describe('AuthorPage', () => {
  it('renders the profile and a cover grid of articles', async () => {
    const html = renderToStaticMarkup(await AuthorPage({ author, articles }));

    expect(html).toContain('data-testid="author-persona"');
    expect(html).toContain('data-testid="author-about"');
    expect(html).toContain('data-testid="author-article-list"');
    expect(html.match(/data-testid="author-article-item"/g)).toHaveLength(2);
  });

  it('renders the profile with empty space when the locale has no articles', async () => {
    const html = renderToStaticMarkup(
      await AuthorPage({ author, articles: [] }),
    );

    expect(html).toContain('data-testid="author-about"');
    expect(html).not.toContain('data-testid="author-article-list"');
  });
});
