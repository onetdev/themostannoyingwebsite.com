import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

import { CoverPlaceholder } from './CoverPlaceholder';

import { ArticleCore } from '@/types';

type SmallCoverListItemProps = {
  article: ArticleCore;
};

export const SmallCoverListItem: FunctionComponent<SmallCoverListItemProps> = ({
  article,
}) => {
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
        <h4 className="my-2 leading-snug">{article.title}</h4>
        <small className="m-0 mb-1 block leading-snug">{article.intro}</small>
      </Link>
    </>
  );
};
