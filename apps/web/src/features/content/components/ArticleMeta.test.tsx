import type { ArticleListItem } from '@maw/content-sdk';
import { renderToStaticMarkup } from 'react-dom/server';
import { ArticleMeta } from './ArticleMeta';

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

const article = {
  author: { name: 'Jane Doe', slug: 'jane-doe' },
  published_at: '2024-01-02T00:00:00.000Z',
  reading_time_minutes: 5,
} as unknown as ArticleListItem;

describe('ArticleMeta', () => {
  it('renders author, reading time and publication date', () => {
    const html = renderToStaticMarkup(<ArticleMeta article={article} />);

    expect(html).toContain('Jane Doe');
    expect(html).toContain('content.article.readingTime');
    expect(html).toContain('2024-01-02T00:00:00.000Z');
  });

  it('can omit the publication date', () => {
    const html = renderToStaticMarkup(
      <ArticleMeta article={article} showDate={false} />,
    );

    expect(html).toContain('content.article.readingTime');
    expect(html).not.toContain('2024-01-02T00:00:00.000Z');
  });

  it('can omit the author', () => {
    const html = renderToStaticMarkup(
      <ArticleMeta article={article} showAuthor={false} />,
    );

    expect(html).not.toContain('Jane Doe');
    expect(html).toContain('content.article.readingTime');
  });
});
