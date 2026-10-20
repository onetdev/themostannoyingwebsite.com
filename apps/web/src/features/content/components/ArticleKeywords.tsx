import type { Article, ArticleListItem } from '@maw/content-sdk';
import { Badge } from '@maw/ui-lib';
import { cn } from 'cn';
import type { ComponentProps } from 'react';

export type ArticleKeywordsProps = Omit<ComponentProps<'div'>, 'children'> & {
  article: Article | ArticleListItem;
  variant?: ComponentProps<typeof Badge>['variant'];
};

/**
 * Renders an article's search keywords as a wrapping row of pills. Search
 * keywords are a distinct, non-navigable set from `ArticleCategories`, so they use
 * the `outline` variant by default to stay visually separate.
 */
export function ArticleKeywords({
  article,
  variant = 'outline',
  className,
  ...rest
}: ArticleKeywordsProps) {
  const keywords = article.keywords ?? [];

  if (keywords.length === 0) {
    return null;
  }

  return (
    <div
      className={cn('flex w-full flex-wrap gap-1', className)}
      data-testid="article-keywords"
      {...rest}
    >
      {keywords.map((keyword) => (
        <Badge key={keyword} variant={variant}>
          {keyword}
        </Badge>
      ))}
    </div>
  );
}
