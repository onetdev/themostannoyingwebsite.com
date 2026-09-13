import {
  type Article,
  type ArticleListItem,
  toCoverImages,
} from '@maw/content-sdk';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { Link } from '@/core/i18n/navigation';
import { CoverPlaceholder } from './CoverPlaceholder';

export type SmallCoverListItemProps = ComponentProps<'article'> & {
  article: Article | ArticleListItem;
};

export function SmallCoverListItem({
  article,
  ...rest
}: SmallCoverListItemProps) {
  const t = useTranslations();
  const coverImages = toCoverImages(article.featured_image);

  return (
    <article {...rest}>
      <Link
        href={`/articles/${article.slug}`}
        passHref
        prefetch={false}
        className="link-as-inherit hover-text-primary"
      >
        {!coverImages?.thumbnail && (
          <CoverPlaceholder width={1920} height={1200} />
        )}
        {coverImages?.thumbnail && (
          <Image
            className="h-auto w-full rounded-sm object-cover"
            src={coverImages.thumbnail}
            alt={t('content.article.coverImage')}
            width="1920"
            height="1200"
          />
        )}
        <h5 className="my-2 line-clamp-2 leading-tight" title={article.title}>
          {article.title}
        </h5>
        <small
          className="text-card-foreground m-0 mb-1 line-clamp-2 leading-snug hover:no-underline"
          title={article.summary}
        >
          {article.summary}
        </small>
      </Link>
    </article>
  );
}
