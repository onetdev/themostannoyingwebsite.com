'use client';

import {
  renderMarkdown,
  type SearchResultItem as SearchResultItemType,
} from '@maw/content-sdk';
import { Badge } from '@maw/ui-lib';
import HTMLReactParser from 'html-react-parser';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/core/i18n/navigation';
import { rememberShortsEntry } from '@/features/content/shorts-entry';

export interface SearchResultItemProps {
  item: SearchResultItemType;
}

export function getSearchResultPath(
  item: Pick<SearchResultItemType, 'type' | 'slug'>,
): string {
  switch (item.type) {
    case 'article':
      return `/articles/${encodeURIComponent(item.slug)}`;
    case 'short':
      return `/shorts/${encodeURIComponent(item.slug)}`;
    case 'page':
      return `/${encodeURIComponent(item.slug)}`;
  }
}

export function SearchResultItem({ item }: SearchResultItemProps) {
  const t = useTranslations('content.search');
  const pathname = usePathname();
  const typeLabels = {
    article: t('types.article'),
    short: t('types.short'),
    page: t('types.page'),
  } as const;
  const onClick =
    item.type === 'short'
      ? () => {
          const search =
            typeof window === 'undefined' ? '' : window.location.search;

          rememberShortsEntry(`${pathname || '/search'}${search}`);
        }
      : undefined;

  return (
    <div
      className="my-4 [&_strong]:bg-tertiary [&_strong]:text-tertiary-foreground [&_strong]:px-0.5 [&_strong]:rounded-xs"
      data-testid="search-result-item"
      data-type={item.type}
    >
      <Badge
        variant="secondary"
        className="mb-2 text-[10px] uppercase tracking-wide"
        data-testid="search-result-type"
      >
        {typeLabels[item.type]}
      </Badge>
      <h4>
        <Link
          href={getSearchResultPath(item)}
          passHref
          prefetch={false}
          data-track="search:result"
          data-track-key={`${item.type}:${item.slug}`}
          onClick={onClick}
        >
          {HTMLReactParser(renderMarkdown(item.title, { inline: true }))}
        </Link>
      </h4>
      <p className="max-w-screen-md">
        {HTMLReactParser(renderMarkdown(item.excerpt, { inline: true }))}
      </p>
    </div>
  );
}
