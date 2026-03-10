'use client';

import { Button } from '@maw/ui-lib';

import { useTranslations } from 'next-intl';
import { useRecommendedSearches } from '@/features/content/hooks';

export interface NoResultsProps {
  onClick: (value: string) => void;
}

export function NoSearchResults({ onClick }: NoResultsProps) {
  const t = useTranslations('content.search');
  const { topSearches: items } = useRecommendedSearches();

  return (
    <>
      <div className="my-10 text-2xl font-bold">❌ {t('noResults')}</div>
      {items.length > 0 && (
        <div className="my-4 text-base">
          <p>{t('peopleAlsoSearched')}</p>
          <ul className="list-inside list-disc pl-5">
            {items.map((item) => (
              <li key={item}>
                <Button
                  variant="ghost"
                  onClick={() => onClick(item)}
                  className="text-primary cursor-pointer"
                >
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
