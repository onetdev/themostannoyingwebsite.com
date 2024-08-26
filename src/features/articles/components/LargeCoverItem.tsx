import Link from 'next/link';
import Image from 'next/image';

import { ArticleCore } from '@/types';

import CoverPlaceholder from './CoverPlaceholder';

type Props = {
  article: ArticleCore;
};

const LargeCoverItem = ({ article }: Props) => {
  return (
    <>
      <Link className="relative block" href={article.url} passHref>
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
        <div className="absolute bottom-0 right-0 flex w-full flex-col items-end p-3">
          <h2 className="mb-3 bg-primary px-3 text-4xl text-on-primary">
            {article.title}
          </h2>
          <p className="m-0 bg-secondary text-xl text-on-secondary">
            {article.intro}
          </p>
        </div>
      </Link>
    </>
  );
};

export default LargeCoverItem;
