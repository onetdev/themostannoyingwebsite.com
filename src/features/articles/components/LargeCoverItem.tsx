import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

import { CoverPlaceholder } from './CoverPlaceholder';

import { type ArticleDatum } from '@/features/articles';

type LargeCoverItemProps = JSXProxyProps<'div'> & {
  article: ArticleDatum;
};

export const LargeCoverItem: FunctionComponent<LargeCoverItemProps> = ({
  article,
  ...rest
}) => {
  return (
    <div {...rest}>
      <Link
        className="relative block"
        href={article.url}
        passHref
        prefetch={false}>
        {!article.coverImages?.original && (
          <CoverPlaceholder width={1920} height={1200} />
        )}
        {article.coverImages?.original && (
          <Image
            className="h-auto w-full object-cover"
            src={article.coverImages.original}
            alt="Cover image"
            width="1920"
            height="1200"
          />
        )}
        <div className="relative bottom-0 right-0 flex w-full flex-col items-end md:absolute md:p-2">
          <h2 className="bg-primary px-2 text-xl text-on-primary md:mb-3 md:px-3 md:text-3xl">
            {article.title}
          </h2>
          <p className="m-0 hidden bg-secondary text-sm text-on-secondary md:block">
            {article.intro}
          </p>
        </div>
      </Link>
    </div>
  );
};
