import type { Article, ArticleListItem } from '@maw/content-sdk';
import { Badge } from '@maw/ui-lib';
import { cn } from 'cn';
import type { ComponentProps } from 'react';

export type ArticleCategoriesProps = Omit<ComponentProps<'div'>, 'children'> & {
  article: Article | ArticleListItem;
  variant?: ComponentProps<typeof Badge>['variant'];
};

/**
 * Renders an article's categories as a single, non-wrapping row of pills.
 * Overflow is clipped so the row never pushes into neighbouring cards.
 */
export function ArticleCategories({
  article,
  variant = 'secondary',
  className,
  ...rest
}: ArticleCategoriesProps) {
  const categories = article.categories ?? [];

  if (categories.length === 0) {
    return null;
  }

  return (
    <div
      className={cn('flex w-full flex-nowrap gap-1 overflow-hidden', className)}
      data-testid="article-categories"
      {...rest}
    >
      {categories.map((category) => (
        <Badge key={category.id} variant={variant}>
          {category.label}
        </Badge>
      ))}
    </div>
  );
}
