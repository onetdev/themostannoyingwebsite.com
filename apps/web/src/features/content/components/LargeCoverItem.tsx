import { toCoverImages } from '@maw/content-sdk';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { Link } from '@/core/i18n/navigation';
import type { Article, ArticleListItem } from '../schemas';
import { CoverPlaceholder } from './CoverPlaceholder';

export type LargeCoverItemProps = ComponentProps<'article'> & {
  article: Article | ArticleListItem;
};

export function LargeCoverItem({ article, ...rest }: LargeCoverItemProps) {
  const t = useTranslations();
  const coverImages = toCoverImages(article.featured_image);

  return (
    <article {...rest}>
      <Link
        className="group relative block"
        href={`/articles/${article.slug}`}
        passHref
        prefetch={false}
      >
        {!coverImages?.original && (
          <CoverPlaceholder width={1920} height={1200} />
        )}
        {coverImages?.original && (
          <Image
            className="h-auto w-full object-cover"
            src={coverImages.original}
            alt={t('content.article.coverImage')}
            width="1920"
            height="1200"
          />
        )}
        <div className="relative right-0 bottom-0 flex w-full flex-col items-start md:absolute md:p-2">
          <h2 className="text-xl transition duration-300 group-hover:brightness-125 md:mb-3 md:text-3xl">
            <span className="bg-primary text-primary-foreground box-decoration-clone px-2 md:px-3">
              {article.title}
            </span>
          </h2>
          <p className="m-0 mb-2 hidden text-sm md:block">
            <span className="bg-card text-card-foreground box-decoration-clone px-2 py-1">
              {article.summary}
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}
