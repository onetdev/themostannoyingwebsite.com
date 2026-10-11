'use client';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Icon,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

/**
 * Idle state shown before the visitor has submitted a search. Distinct from
 * `NoSearchResults`, which is only shown after a query returned zero items.
 */
export function SearchEmptyState() {
  const t = useTranslations('content.search');

  return (
    <Empty data-testid="search-empty-state">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon icon="search" />
        </EmptyMedia>
        <EmptyTitle>{t('emptyTitle')}</EmptyTitle>
        <EmptyDescription>{t('emptyDescription')}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
