'use client';

import type { ArticleSearchResult } from '@maw/content-api';
import HTMLReactParser from 'html-react-parser';
import { Link } from '@/i18n/navigation';

export interface SearchResultItemProps {
  item: ArticleSearchResult;
}

export function SearchResultItem({ item }: SearchResultItemProps) {
  return (
    <div className="my-4" key={item.lookup.slug}>
      <h4>
        <Link href={`articles/${item.lookup.slug}`} passHref prefetch={false}>
          {item.title}
        </Link>
      </h4>
      <p className="max-w-screen-md">
        {HTMLReactParser(item.contextHighlight)}
      </p>
    </div>
  );
}
