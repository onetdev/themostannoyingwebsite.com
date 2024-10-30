import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

import { CoverPlaceholder } from './CoverPlaceholder';

import { type ArticleDatum } from '@/features/articles';

type SmallCoverListItemProps = {
  article: ArticleDatum;
};

export const SmallCoverListItem: FunctionComponent<SmallCoverListItemProps> = ({
  article,
}) => {
  return (
    <>
      <Link href={article.url} passHref prefetch={false}>
        {!article.coverImages?.thumbnail && (
          <CoverPlaceholder width={1920} height={1200} />
        )}
        {article.coverImages?.thumbnail && (
          <Image
            className="h-auto w-full object-cover"
            src={article.coverImages.thumbnail}
            alt="Cover image"
            width="1920"
            height="1200"
          />
        )}
        <h4 className="my-2 leading-snug">{article.title}</h4>
        <small className="m-0 mb-1 block leading-snug text-on-surface hover:no-underline">
          {article.intro}
        </small>
      </Link>
    </>
  );
};
