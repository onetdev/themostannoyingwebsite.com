import { notFound } from 'next/navigation';
import { JsonLd } from '@/core/seo';
import { ArticlesPage } from '@/features/content/components';
import { PageLayout } from '../../_components/PageLayout';
import { articlesPagination } from './articles-pagination';
import { buildArticlesJsonLd } from './build-articles-json-ld';
import { loadArticlesPage } from './load-articles-page';

export interface RenderArticlesPageInput {
  locale: AppLocale;
  page: number;
}

/**
 * Shared server renderer for the archive's page-1 route and its paginated
 * sibling. Keeping the layout, structured data and data loading here means the
 * two entry points cannot drift apart.
 */
export async function renderArticlesPage({
  locale,
  page,
}: RenderArticlesPageInput) {
  const data = await loadArticlesPage({ locale, page });

  if (!data) {
    return notFound();
  }

  const jsonLd = await buildArticlesJsonLd({
    locale,
    page,
    articles: data.items,
    offset: data.offset,
  });

  return (
    <PageLayout route="articles" role="main">
      <JsonLd data={jsonLd} />
      <ArticlesPage
        articles={data.items}
        currentPage={page}
        pageCount={data.pageCount}
        total={data.total}
        offset={data.offset}
        hrefForPage={articlesPagination.getPath}
      />
    </PageLayout>
  );
}
