import Link from 'next/link';
import { FunctionComponent } from 'react';

import { ArticleCore } from '@/types';

type TextListItemProps = {
  article: ArticleCore;
};

export const TextListItem: FunctionComponent<TextListItemProps> = ({
  article,
}) => {
  return (
    <>
      <Link href={article.url} passHref>
        <h4 className="leading-tight">{article.title}</h4>
        <small className="my-2 block">{article.intro}</small>
      </Link>
    </>
  );
};
