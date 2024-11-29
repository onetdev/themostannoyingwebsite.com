import Link from 'next/link';
import { FunctionComponent } from 'react';

import { type ArticleDatum } from '@/features/content';

type TextListItemProps = {
  article: ArticleDatum;
};

export const TextListItem: FunctionComponent<TextListItemProps> = ({
  article,
}) => {
  return (
    <>
      <Link href={article.url} passHref prefetch={false}>
        <h4 className="leading-tight">{article.title}</h4>
        <small className="my-2 block text-on-surface">{article.intro}</small>
      </Link>
    </>
  );
};
