'use client';

import {
  renderMarkdown,
  type SearchResultItem as SearchResultItemType,
} from '@maw/content-sdk';
import HTMLReactParser from 'html-react-parser';
import { Link } from '@/core/i18n/navigation';

export interface SearchResultItemProps {
  item: SearchResultItemType;
}

export function SearchResultItem({ item }: SearchResultItemProps) {
  return (
    <div
      className="my-4 [&_strong]:bg-tertiary [&_strong]:text-tertiary-foreground [&_strong]:px-0.5 [&_strong]:rounded-xs"
      key={item.slug}
    >
      <h4>
        <Link href={`/articles/${item.slug}`} passHref prefetch={false}>
          {HTMLReactParser(renderMarkdown(item.title, { inline: true }))}
        </Link>
      </h4>
      <p className="max-w-screen-md">
        {HTMLReactParser(renderMarkdown(item.excerpt, { inline: true }))}
      </p>
    </div>
  );
}
