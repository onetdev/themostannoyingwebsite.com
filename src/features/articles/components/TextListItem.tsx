import Link from 'next/link';

import { ArticleCore } from '@/types';

type Props = {
  article: ArticleCore;
};

export const TextListItem = ({ article }: Props) => {
  return (
    <>
      <Link className="leading-tight" href={article.url} passHref>
        <h3 className="m-0 font-bold">{article.title}</h3>
        <p className="my-2 text-sm">{article.intro}</p>
      </Link>
    </>
  );
};
