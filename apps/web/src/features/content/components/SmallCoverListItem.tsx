import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { CoverPlaceholder } from './CoverPlaceholder';
import { ArticleDatum } from '../schemas';

import { Link } from '@/i18n/navigation';

export type SmallCoverListItemProps = JSXProxyProps<'article'> & {
  article: ArticleDatum;
};

export function SmallCoverListItem({
  article,
  ...rest
}: SmallCoverListItemProps) {
  const t = useTranslations();

  return (
    <article role="article" {...rest}>
      <Link
        href={article.url}
        passHref
        prefetch={false}
        className="link-as-inherit hover-text-primary">
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
          className="text-card-foreground m-0 mb-1 line-clamp-2 leading-snug hover:no-underline"
          title={article.intro}>
          {article.intro}
        </small>
      </Link>
    </article>
  );
}
