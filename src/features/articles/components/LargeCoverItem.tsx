import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

import { CoverPlaceholder } from './CoverPlaceholder';

import { ArticleData } from '@/features/articles/types';

type LargeCoverItemProps = JSXProxyProps<'div'> & {
  article: ArticleData;
};

export const LargeCoverItem: FunctionComponent<LargeCoverItemProps> = ({
  article,
  ...rest
}) => {
  return (
    <div {...rest}>
      <Link className="relative block" href={article.url} passHref>
        {!article.coverImagePath && (
          <CoverPlaceholder width={1920} height={1200} />
        )}
        {article.coverImagePath && (
          <Image
            className="h-auto w-full object-cover"
            src={article.coverImagePath}
            alt="Cover image"
            width="1920"
            height="1200"
          />
        )}
        <div className="absolute bottom-0 right-0 flex w-full flex-col items-end p-2">
          <h2 className="mb-3 bg-primary px-3 text-on-primary">
            {article.title}
          </h2>
          <p className="m-0 bg-secondary text-on-secondary">{article.intro}</p>
        </div>
      </Link>
    </div>
  );
};
