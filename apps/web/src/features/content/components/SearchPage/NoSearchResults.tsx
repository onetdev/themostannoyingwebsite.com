'use client';

import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Icon,
} from '@maw/ui-lib';

import { useTranslations } from 'next-intl';
import { useRecommendedSearches } from '@/features/content/hooks';

export interface NoResultsProps {
  onClick: (value: string) => void;
}

export function NoSearchResults({ onClick }: NoResultsProps) {
  const t = useTranslations('content.search');
  const { topSearches: items } = useRecommendedSearches();

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon icon="search" />
        </EmptyMedia>
        <EmptyTitle>{t('noResults')}</EmptyTitle>
        {items.length > 0 && (
          <EmptyDescription>{t('peopleAlsoSearched')}</EmptyDescription>
        )}
      </EmptyHeader>
      {items.length > 0 && (
        <EmptyContent>
          <ul className="flex flex-wrap justify-center gap-2">
            {items.map((item) => (
              <li key={item}>
                <Button variant="ghost" onClick={() => onClick(item)}>
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </EmptyContent>
      )}
    </Empty>
  );
}
