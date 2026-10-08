import type { Article, ArticleListItem } from '@maw/content-sdk';
import { cn } from '@maw/ui-lib/utils';
import type { ComponentProps } from 'react';
import { Link } from '@/core/i18n/navigation';
import { ArticleMeta } from './ArticleMeta';

export type TextListItemProps = ComponentProps<'article'> & {
  article: Article | ArticleListItem;
};

export function TextListItem({
  article,
  className,
  ...rest
}: TextListItemProps) {
  return (
    <article {...rest} className={cn('group', className)}>
      <Link
        href={`/articles/${article.slug}`}
        passHref
        className="link-as-inherit hover-text-primary block"
        prefetch={false}
      >
        <h2
          className="line-clamp-2 text-lg leading-tight transition-colors"
          title={article.title}
        >
          {article.title}
        </h2>
        <p
          className="text-muted-foreground mt-1 mb-2 line-clamp-2 text-sm"
          title={article.summary}
        >
          {article.summary}
        </p>
        <ArticleMeta article={article} showAuthor={false} showDate={false} />
      </Link>
    </article>
  );
}
