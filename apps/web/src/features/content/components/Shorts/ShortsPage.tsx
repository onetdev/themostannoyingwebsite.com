import type { ShortListItem } from '@maw/content-sdk';
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

import { ShortGrid } from './ShortGrid';

export interface ShortsPageProps {
  shorts: ShortListItem[];
  currentPage: number;
  pageCount: number;
  total: number;
  hrefForPage: (page: number) => string;
}

/**
 * The full shorts archive as a dense portrait grid.
 */
export async function ShortsPage({
  shorts,
  currentPage,
  pageCount,
  total,
  hrefForPage,
}: ShortsPageProps) {
  const t = await getTranslations('content.shorts');
  const hasShorts = shorts.length > 0;
  const showPagination = pageCount > 1;

  return (
    <div
      data-testid="shorts-page"
      data-track-section="content:shorts"
      className="mx-auto w-full max-w-7xl"
    >
      <PageHeadline actions={<ShareButton section="content:shorts" />}>
        {t('archiveTitle')}
      </PageHeadline>
      <p className="text-muted-foreground mb-4 max-w-3xl text-lg">
        {t('archiveDescription')}
      </p>
      {hasShorts && (
        <>
          <p
            className="text-muted-foreground mb-4 text-sm"
            data-testid="shorts-page-count"
          >
            {t('count', { count: total })}
          </p>
          <ShortGrid shorts={shorts} />
        </>
      )}
      {!hasShorts && (
        <Empty data-testid="shorts-empty">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icon icon="clapperboard" />
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
          section="content:shorts"
          className="mt-10"
        />
      )}
    </div>
  );
}
