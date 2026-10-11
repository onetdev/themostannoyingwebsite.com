import type { Article, ArticleListItem } from '@maw/content-sdk';
import { cn } from '@maw/ui-lib/utils';
import type { ComponentProps } from 'react';
import { ArticleKeywords } from './ArticleKeywords';
import { ArticleTags } from './ArticleTags';

export type ArticleTagKeywordsProps = Omit<
  ComponentProps<'div'>,
  'children'
> & {
  article: Article | ArticleListItem;
};

/**
 * Renders an article's tags and keywords as a single continuous, wrapping list
 * of pills. Each child keeps its own visual differentiation (`secondary` tags,
 * `outline` keywords); `contents` flattens their wrappers so every pill flows
 * together in one flex row and wraps as a group instead of stacking per set.
 */
export function ArticleTagKeywords({
  article,
  className,
  ...rest
}: ArticleTagKeywordsProps) {
  const hasTags = (article.tags ?? []).length > 0;
  const hasKeywords = (article.keywords ?? []).length > 0;

  if (!hasTags && !hasKeywords) {
    return null;
  }

  return (
    <div
      className={cn('flex w-full flex-wrap gap-1', className)}
      data-testid="article-tag-keywords"
      {...rest}
    >
      <ArticleTags article={article} className="contents" />
      <ArticleKeywords article={article} className="contents" />
    </div>
  );
}
