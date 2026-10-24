import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@maw/ui-lib';
import { getLocale, getTranslations } from 'next-intl/server';
import type { ComponentProps } from 'react';
import { getLangDir } from '@/core/i18n/get-lang-dir';
import { Link } from '@/core/i18n/navigation';
import {
  getPaginationItems,
  type PaginationItemValue,
} from '@/core/navigation/pagination';
import type { TelemetrySection } from '@/core/telemetry';

export type PaginationControlsProps = Omit<
  ComponentProps<typeof Pagination>,
  'children' | 'label'
> & {
  currentPage: number;
  pageCount: number;
  /** Builds the canonical href for a page number. */
  hrefForPage: (page: number) => string;
  /** Accessible name for this pagination landmark (owned by the feature). */
  label: string;
  /** Telemetry surface that scopes every control's interaction. */
  section: TelemetrySection;
};

const disabledClassName = 'pointer-events-none opacity-50';

/**
 * Locale-aware pagination built on the design system's shadcn pagination
 * primitives. Control copy is generic (`common.pagination`); callers only
 * provide the landmark name and telemetry section.
 *
 * Every control is a link, so pagination works without client-side JavaScript.
 */
export async function PaginationControls({
  currentPage,
  pageCount,
  hrefForPage,
  label,
  section,
  className,
  ...rest
}: PaginationControlsProps) {
  const [t, locale] = await Promise.all([
    getTranslations('common.pagination'),
    getLocale(),
  ]);
  const direction = getLangDir(locale);
  const items = getPaginationItems(currentPage, pageCount);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= pageCount;
  const trackKey = (action: 'previous' | 'next' | 'page') =>
    `${section}:${action}`;

  const renderItem = (item: PaginationItemValue) => {
    if (typeof item !== 'number') {
      return (
        <PaginationItem key={item}>
          <PaginationEllipsis label={t('ellipsis')} />
        </PaginationItem>
      );
    }

    const isCurrent = item === currentPage;

    return (
      <PaginationItem key={item}>
        <PaginationLink
          href={hrefForPage(item)}
          isActive={isCurrent}
          aria-label={t('page', { page: item })}
          title={t('page', { page: item })}
          linkComponent={Link}
          data-track={trackKey('page')}
          data-track-key={item}
          data-testid={isCurrent ? 'pagination-current' : 'pagination-page'}
        >
          {item}
        </PaginationLink>
      </PaginationItem>
    );
  };

  return (
    <Pagination
      label={label}
      dir={direction}
      className={className}
      data-track-section={section}
      data-testid="pagination"
      {...rest}
    >
      <PaginationContent>
        <PaginationItem>
          {isFirstPage ? (
            <PaginationPrevious
              text={t('previous')}
              label={t('previousLabel')}
              aria-disabled="true"
              tabIndex={-1}
              className={disabledClassName}
              data-disabled="true"
              data-testid="pagination-previous"
            />
          ) : (
            <PaginationPrevious
              href={hrefForPage(currentPage - 1)}
              rel="prev"
              text={t('previous')}
              label={t('previousLabel')}
              linkComponent={Link}
              data-track={trackKey('previous')}
              data-testid="pagination-previous"
            />
          )}
        </PaginationItem>
        {items.map(renderItem)}
        <PaginationItem>
          {isLastPage ? (
            <PaginationNext
              text={t('next')}
              label={t('nextLabel')}
              aria-disabled="true"
              tabIndex={-1}
              className={disabledClassName}
              data-disabled="true"
              data-testid="pagination-next"
            />
          ) : (
            <PaginationNext
              href={hrefForPage(currentPage + 1)}
              rel="next"
              text={t('next')}
              label={t('nextLabel')}
              linkComponent={Link}
              data-track={trackKey('next')}
              data-testid="pagination-next"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
