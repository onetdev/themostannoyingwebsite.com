import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FunctionComponent } from 'react';

import { CoverPlaceholder } from './CoverPlaceholder';

import { Link } from '@/i18n/navigation';
import { type ArticleDatum } from '@/modules/content';

type SmallCoverListItemProps = JSXProxyProps<'article'> & {
  article: ArticleDatum;
};

export const SmallCoverListItem: FunctionComponent<SmallCoverListItemProps> = ({
  article,
  ...rest
}) => {
  const t = useTranslations();

  return (
    <article role="article" {...rest}>
      <Link
        href={article.url}
        passHref
        prefetch={false}
        className="as-text hover-text-primary">
        {!article.coverImages?.thumbnail && (
          <CoverPlaceholder width={1920} height={1200} />
        )}
        {article.coverImages?.thumbnail && (
          <Image
            className="h-auto w-full rounded-sm object-cover"
            src={article.coverImages.thumbnail}
            alt={t('article.coverImage')}
            width="1920"
            height="1200"
          />
        )}
        <h5 className="my-2 line-clamp-2 leading-tight" title={article.title}>
          {article.title}
        </h5>
        <small
          className="text-on-surface m-0 mb-1 line-clamp-2 leading-snug hover:no-underline"
          title={article.intro}>
          {article.intro}
        </small>
      </Link>
    </article>
  );
};
