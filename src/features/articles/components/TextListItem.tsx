import Link from 'next/link';
import { FunctionComponent } from 'react';

import { ArticleData } from '@/features/articles/types';

type TextListItemProps = {
  article: ArticleData;
};

export const TextListItem: FunctionComponent<TextListItemProps> = ({
  article,
}) => {
  return (
    <>
      <Link href={article.url} passHref prefetch={false}>
        <h4 className="leading-tight">{article.title}</h4>
        <small className="my-2 block">{article.intro}</small>
      </Link>
    </>
  );
};
