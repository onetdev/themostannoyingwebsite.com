import type { Article } from '@maw/content-sdk';
import { renderToStaticMarkup } from 'react-dom/server';
import { ArticleItemPage } from './ArticleItemPage';

jest.mock('html-react-parser', () => ({
  __esModule: true,
  default: (html: string) => html,
}));

jest.mock('next-intl', () => ({
  useTranslations: () => {
    const translate = (key: string, values?: Record<string, unknown>) =>
      values ? `${key}:${JSON.stringify(values)}` : key;
    return Object.assign(translate, {
      rich: (key: string, values?: Record<string, unknown>) =>
        values ? `${key}:${JSON.stringify(values)}` : key,
    });
  },
  useFormatter: () => ({
    dateTime: (date: Date) => date.toISOString(),
  }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => (
    // biome-ignore lint/performance/noImgElement: test double for next/image
    // biome-ignore lint/a11y/useAltText: alt is spread from props
    <img {...props} />
  ),
}));

jest.mock('@/core/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock('@/stores', () => ({
  usePainPreferencesStore: (selector: (state: unknown) => unknown) =>
    selector({ flags: { contentPaywall: false } }),
}));

jest.mock('./PartitionalLockedContent', () => ({
  PartitionalLockedContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/features/share/components', () => ({
  ShareButton: () => <button type="button">Share</button>,
}));

jest.mock('@/features/comments/components', () => ({
  CommentSection: () => <div data-testid="comment-section" />,
}));

const article = {
  slug: 'world-ends',
  title: 'THE WORLD HAS ENDED',
  summary: 'A very serious report.',
  content: 'Body copy',
  categories: [{ id: 'news', label: 'News' }],
  keywords: ['climate', 'internet'],
  author: { name: 'Jane Doe', slug: 'jane-doe' },
  published_at: '2024-01-02T00:00:00.000Z',
  reading_time_minutes: 5,
  featured_image: {
    variants: {
      lg: { url: 'https://cdn.example.com/cover.jpg' },
    },
  },
} as unknown as Article;

describe('ArticleItemPage', () => {
  it('renders the cover image before the title', () => {
    const html = renderToStaticMarkup(
      <ArticleItemPage
        article={article}
        comments={[]}
        renderedContent={article.content}
      />,
    );

    const coverIndex = html.indexOf('cover.jpg');
    const titleIndex = html.indexOf('<h1');

    expect(coverIndex).toBeGreaterThan(-1);
    expect(titleIndex).toBeGreaterThan(-1);
    expect(coverIndex).toBeLessThan(titleIndex);
  });

  it('uses the article title as the cover image alt text', () => {
    const html = renderToStaticMarkup(
      <ArticleItemPage
        article={article}
        comments={[]}
        renderedContent={article.content}
      />,
    );

    expect(html).toContain('alt="THE WORLD HAS ENDED"');
  });

  it('renders categories and keywords pills in a single header list', () => {
    const html = renderToStaticMarkup(
      <ArticleItemPage
        article={article}
        comments={[]}
        renderedContent={article.content}
      />,
    );

    expect(html).toContain('data-testid="article-category-keywords"');
    expect(html).toContain('data-testid="article-categories"');
    expect(html).toContain('data-testid="article-keywords"');
    expect(html).toContain('News');
    expect(html).toContain('climate');
  });

  it('omits the cover image when none is provided', () => {
    const html = renderToStaticMarkup(
      <ArticleItemPage
        article={
          { ...article, featured_image: undefined } as unknown as Article
        }
        comments={[]}
        renderedContent={article.content}
      />,
    );

    expect(html).not.toContain('cover.jpg');
    expect(html).toContain('<h1');
  });
});
