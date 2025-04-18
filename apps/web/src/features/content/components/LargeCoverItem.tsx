import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FunctionComponent } from 'react';

import { CoverPlaceholder } from './CoverPlaceholder';

import { type ArticleDatum } from '@/features/content';
import { Link } from '@/i18n/navigation';

type LargeCoverItemProps = JSXProxyProps<'article'> & {
  article: ArticleDatum;
};

export const LargeCoverItem: FunctionComponent<LargeCoverItemProps> = ({
  article,
  ...rest
}) => {
  const t = useTranslations();

  return (
    <article role="article" {...rest}>
      <Link
        className="group relative block"
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
            alt={t('article.coverImage')}
            width="1920"
            height="1200"
          />
        )}
        <div className="relative right-0 bottom-0 flex w-full flex-col items-start md:absolute md:p-2">
          <h2 className="text-xl transition duration-300 group-hover:brightness-125 md:mb-3 md:text-3xl">
            <span className="bg-primary text-on-primary box-decoration-clone px-2 md:px-3">
              {article.title}
            </span>
          </h2>
          <p className="m-0 mb-2 hidden text-sm md:block">
            <span className="bg-secondary text-on-secondary box-decoration-clone px-2 py-1">
              {article.intro}
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
};
