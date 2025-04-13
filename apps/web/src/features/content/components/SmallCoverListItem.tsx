import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FunctionComponent } from 'react';

import { CoverPlaceholder } from './CoverPlaceholder';

import { type ArticleDatum } from '@/features/content';
import { Link } from '@/i18n/navigation';

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
      <Link href={article.url} passHref prefetch={false}>
        {!article.coverImages?.thumbnail && (
          <CoverPlaceholder width={1920} height={1200} />
        )}
        {article.coverImages?.thumbnail && (
          <Image
            className="h-auto w-full object-cover"
            src={article.coverImages.thumbnail}
            alt={t('article.coverImage')}
            width="1920"
            height="1200"
          />
        )}
        <h4 className="my-2 leading-tight">{article.title}</h4>
        <small className="text-on-surface m-0 mb-1 block leading-snug hover:no-underline">
          {article.intro}
        </small>
      </Link>
    </article>
  );
};
