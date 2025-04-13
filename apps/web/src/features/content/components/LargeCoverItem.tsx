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
            alt={t('article.coverImage')}
            width="1920"
            height="1200"
          />
        )}
        <div className="relative right-0 bottom-0 flex w-full flex-col items-end md:absolute md:p-2">
          <h2 className="bg-primary text-on-primary px-2 text-xl md:mb-3 md:px-3 md:text-3xl">
            {article.title}
          </h2>
          <p className="bg-secondary text-on-secondary m-0 hidden text-sm md:block">
            {article.intro}
          </p>
        </div>
      </Link>
    </article>
  );
};
