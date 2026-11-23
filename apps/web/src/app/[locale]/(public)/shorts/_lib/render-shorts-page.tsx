import { notFound } from 'next/navigation';
import { JsonLd } from '@/core/seo';
import { ShortsPage } from '@/features/content/components';
import { PageLayout } from '../../_components/PageLayout';
import { buildShortsJsonLd } from './build-shorts-json-ld';
import { loadShortsPage } from './load-shorts-page';
import { shortsPagination } from './shorts-pagination';

export interface RenderShortsPageInput {
  locale: AppLocale;
  page: number;
}

/**
 * Shared server renderer for the archive's page-1 route and its paginated
 * sibling, keeping layout, structured data and data loading in sync.
 */
export async function renderShortsPage({
  locale,
  page,
}: RenderShortsPageInput) {
  const data = await loadShortsPage(locale, page);

  if (!data) {
    return notFound();
  }

  const jsonLd = await buildShortsJsonLd({
    locale,
    page,
    shorts: data.items,
    offset: data.offset,
  });

  return (
    <PageLayout route="shorts" role="main">
      <JsonLd data={jsonLd} />
      <ShortsPage
        shorts={data.items}
        currentPage={page}
        pageCount={data.pageCount}
        total={data.total}
        hrefForPage={shortsPagination.getPath}
      />
    </PageLayout>
  );
}
