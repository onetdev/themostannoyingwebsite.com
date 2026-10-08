import {
  type Article,
  type ArticleListItem,
  toCoverImages,
} from '@maw/content-sdk';
import { cn } from '@maw/ui-lib/utils';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import { Link } from '@/core/i18n/navigation';
import { ArticleMeta } from './ArticleMeta';
import { ArticleTags } from './ArticleTags';
import { CoverPlaceholder } from './CoverPlaceholder';

export type LargeCoverItemProps = ComponentProps<'article'> & {
  article: Article | ArticleListItem;
};

export function LargeCoverItem({
  article,
  className,
  ...rest
}: LargeCoverItemProps) {
  const coverImages = toCoverImages(article.featured_image);

  return (
    <article {...rest} className={cn('group relative', className)}>
      <Link
        className="link-as-inherit block overflow-hidden rounded-sm"
        href={`/articles/${article.slug}`}
        passHref
        prefetch={false}
      >
        <div className="bg-muted relative aspect-[16/9] w-full overflow-hidden">
          {!coverImages?.original && (
            <CoverPlaceholder fill width={1920} height={1200} />
          )}
          {coverImages?.original && (
            <Image
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              src={coverImages.original}
              alt=""
              fill
              sizes="(min-width: 1024px) 75vw, 100vw"
              loading="eager"
            />
          )}
          <div className="from-background/95 via-background/40 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-4 md:p-6">
            <ArticleTags article={article} variant="default" />
            <h2 className="text-2xl transition duration-300 group-hover:brightness-110 md:text-3xl">
              <span className="bg-primary text-primary-foreground box-decoration-clone px-2 md:px-3">
                {article.title}
              </span>
            </h2>
            <p className="m-0 hidden text-sm md:block">
              <span className="bg-card text-card-foreground box-decoration-clone px-2 py-1">
                {article.summary}
              </span>
            </p>
            <ArticleMeta
              article={article}
              showAuthor={false}
              className="text-foreground"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
