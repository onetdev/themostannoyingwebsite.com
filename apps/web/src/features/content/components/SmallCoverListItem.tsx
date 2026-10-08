import {
  type Article,
  type ArticleListItem,
  toCoverImages,
} from '@maw/content-sdk';
import { cn } from '@maw/ui-lib/utils';
import Image from 'next/image';
import type { ComponentProps, ElementType } from 'react';
import { Link } from '@/core/i18n/navigation';
import { ArticleMeta } from './ArticleMeta';
import { ArticleTags } from './ArticleTags';
import { CoverPlaceholder } from './CoverPlaceholder';

export type SmallCoverListItemProps = ComponentProps<'article'> & {
  article: Article | ArticleListItem;
  /**
   * Heading level for the card title. Defaults to `3` so it nests under a
   * section heading; the home page promotes cards to `2` under its own `h1`.
   */
  headingLevel?: 2 | 3 | 4;
};

export function SmallCoverListItem({
  article,
  headingLevel = 3,
  className,
  ...rest
}: SmallCoverListItemProps) {
  const coverImages = toCoverImages(article.featured_image);
  const TitleTag: ElementType = `h${headingLevel}`;

  return (
    <article {...rest} className={cn('group flex h-full flex-col', className)}>
      <Link
        href={`/articles/${article.slug}`}
        passHref
        prefetch={false}
        className="link-as-inherit hover-text-primary flex h-full flex-col"
      >
        <div className="bg-muted relative aspect-[16/10] w-full overflow-hidden rounded-sm">
          {!coverImages?.thumbnail && (
            <CoverPlaceholder fill width={1920} height={1200} />
          )}
          {coverImages?.thumbnail && (
            <Image
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              src={coverImages.thumbnail}
              alt=""
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col pt-3">
          <ArticleTags article={article} className="mb-2" />
          <TitleTag
            className="line-clamp-2 text-base leading-tight"
            title={article.title}
          >
            {article.title}
          </TitleTag>
          <p
            className="text-muted-foreground mt-1 mb-3 line-clamp-2 text-sm leading-snug"
            title={article.summary}
          >
            {article.summary}
          </p>
          <ArticleMeta
            article={article}
            showAuthor={false}
            className="mt-auto"
          />
        </div>
      </Link>
    </article>
  );
}
