import type { ArticleListItem, Author } from '@maw/content-sdk';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Icon,
  PageHeadline,
} from '@maw/ui-lib';
import { getTranslations } from 'next-intl/server';
import { ShareButton } from '@/features/share/components';
import { SmallCoverListItem } from './SmallCoverListItem';

export interface AuthorPageProps {
  author: Author;
  articles: ArticleListItem[];
}

export async function AuthorPage({ author, articles }: AuthorPageProps) {
  const t = await getTranslations('content');
  const hasArticles = articles.length > 0;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-start">
      <header className="lg:sticky lg:top-24 lg:col-span-1">
        <PageHeadline
          className="mb-2"
          actions={<ShareButton section="content:author" />}
        >
          {author.name}
        </PageHeadline>
        <p
          className="text-muted-foreground mb-5 text-xl italic"
          data-testid="author-persona"
        >
          {author.persona}
        </p>
        <p className="leading-relaxed" data-testid="author-about">
          {author.about}
        </p>
      </header>
      <section className="lg:col-span-2" data-track-section="content:author">
        <h2 className="mb-5">
          {t('author.articlesTitle', { name: author.name })}
        </h2>
        {hasArticles ? (
          <ul
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            data-testid="author-article-list"
          >
            {articles.map((article) => (
              <li key={article.id}>
                <SmallCoverListItem
                  article={article}
                  data-testid="author-article-item"
                />
              </li>
            ))}
          </ul>
        ) : (
          <Empty data-testid="author-articles-empty">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Icon icon="info" />
              </EmptyMedia>
              <EmptyTitle>{t('author.emptyTitle')}</EmptyTitle>
              <EmptyDescription>
                {t('author.emptyDescription')}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </section>
    </div>
  );
}
