import Link from 'next/link';

import { ArticleCore } from '@/types';

type Props = {
  article: ArticleCore;
};

export const TextListItem = ({ article }: Props) => {
  return (
    <>
      <Link href={article.url} passHref>
        <h4 className="leading-tight">{article.title}</h4>
        <small className="my-2 block">{article.intro}</small>
      </Link>
    </>
  );
};
