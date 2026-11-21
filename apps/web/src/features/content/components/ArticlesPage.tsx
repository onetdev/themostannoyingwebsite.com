import type { ArticleListItem } from '@maw/content-sdk';
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
import { PaginationControls } from '@/components/PaginationControls';
import { ShareButton } from '@/features/share/components';
import { SmallCoverListItem } from './SmallCoverListItem';

export interface ArticlesPageProps {
  articles: ArticleListItem[];
  currentPage: number;
  pageCount: number;
  total: number;
  /** Number of items skipped before this page. */
  offset: number;
  hrefForPage: (page: number) => string;
}

/**
 * The full article archive as a four-column card grid on large screens,
 * including the pagination control.
 */
export async function ArticlesPage({
  articles,
  currentPage,
  pageCount,
  total,
  offset,
  hrefForPage,
}: ArticlesPageProps) {
  const t = await getTranslations('content.articles');
  const hasArticles = articles.length > 0;
  const showPagination = pageCount > 1;
  const from = total === 0 ? 0 : offset + 1;
  const to = offset + articles.length;

  return (
    <div data-testid="articles-page" data-track-section="content:articles">
      <PageHeadline actions={<ShareButton section="content:articles" />}>
        {t('headline')}
      </PageHeadline>
      <p className="text-muted-foreground mb-6 max-w-3xl text-lg">
        {t('description')}
      </p>
      {hasArticles && (
        <>
          <p
            className="text-muted-foreground mb-4 text-sm"
            data-testid="articles-page-info"
          >
            {t('pageInfo', { from, to, total })}
          </p>
          <ul
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            data-testid="articles-list"
          >
            {articles.map((article) => (
              <li key={article.id}>
                <SmallCoverListItem
                  article={article}
                  headingLevel={2}
                  data-testid="articles-list-item"
                />
              </li>
            ))}
          </ul>
        </>
      )}
      {!hasArticles && (
        <Empty data-testid="articles-empty">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icon icon="info" />
            </EmptyMedia>
            <EmptyTitle>{t('emptyTitle')}</EmptyTitle>
            <EmptyDescription>{t('emptyDescription')}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
      {showPagination && (
        <PaginationControls
          currentPage={currentPage}
          pageCount={pageCount}
          hrefForPage={hrefForPage}
          label={t('pagination.navigation')}
          section="content:articles:pagination"
          className="mt-10"
        />
      )}
    </div>
  );
}
