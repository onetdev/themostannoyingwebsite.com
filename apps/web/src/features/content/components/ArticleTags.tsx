import type { Article, ArticleListItem } from '@maw/content-sdk';
import { Badge } from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import type { ComponentProps } from 'react';

export type ArticleTagsProps = Omit<ComponentProps<'div'>, 'children'> & {
  article: Article | ArticleListItem;
  variant?: ComponentProps<typeof Badge>['variant'];
};

/**
 * Renders an article's tags as a single, non-wrapping row of pills. Overflow is
 * clipped so the row never pushes into neighbouring cards.
 */
export function ArticleTags({
  article,
  variant = 'secondary',
  className,
  ...rest
}: ArticleTagsProps) {
  const tags = article.tags ?? [];

  if (tags.length === 0) {
    return null;
  }

  return (
    <div
      className={cn('flex w-full flex-nowrap gap-1 overflow-hidden', className)}
      data-testid="article-tags"
      {...rest}
    >
      {tags.map((tag) => (
        <Badge key={tag} variant={variant}>
          {tag}
        </Badge>
      ))}
    </div>
  );
}
