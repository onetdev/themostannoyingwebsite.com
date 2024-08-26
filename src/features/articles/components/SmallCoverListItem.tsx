import Link from 'next/link';
import Image from 'next/image';

import { ArticleCore } from '@/types';

import CoverPlaceholder from './CoverPlaceholder';

type Props = {
  article: ArticleCore;
};

const SmallCoverListItem = ({ article }: Props) => {
  return (
    <>
      <Link href={article.url} passHref>
        {!article.coverImage && <CoverPlaceholder width={1920} height={1200} />}
        {article.coverImage && (
          <Image
            className="h-auto w-full object-cover"
            src={article.coverImage}
            alt="Cover image"
            width="1920"
            height="1200"
          />
        )}
        <h3 className="my-3">{article.title}</h3>
        <p className="m-0 mb-3">{article.intro}</p>
      </Link>
    </>
  );
};

export default SmallCoverListItem;
