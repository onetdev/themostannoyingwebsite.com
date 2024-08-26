import Link from 'next/link';

import { ArticleCore } from '@/types';

type Props = {
  article: ArticleCore;
};

const TextListItem = ({ article }: Props) => {
  return (
    <>
      <Link className="no-underline" href={article.url} passHref>
        <h3 className="m-0">{article.title}</h3>
        <p className="my-3">{article.intro}</p>
      </Link>
    </>
  );
};

export default TextListItem;
