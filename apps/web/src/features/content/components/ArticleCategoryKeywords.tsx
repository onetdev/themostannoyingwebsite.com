import type { Article, ArticleListItem } from '@maw/content-sdk';
import { cn } from 'cn';
import type { ComponentProps } from 'react';
import { ArticleCategories } from './ArticleCategories';
import { ArticleKeywords } from './ArticleKeywords';

export type ArticleCategoryKeywordsProps = Omit<
  ComponentProps<'div'>,
  'children'
> & {
  article: Article | ArticleListItem;
};

/**
 * Renders an article's categories and keywords as a single continuous,
 * wrapping list of pills. Each child keeps its own visual differentiation
 * (`secondary` categories, `outline` keywords); `contents` flattens their
 * wrappers so every pill flows together in one flex row and wraps as a group
 * instead of stacking per set.
 */
export function ArticleCategoryKeywords({
  article,
  className,
  ...rest
}: ArticleCategoryKeywordsProps) {
  const hasCategories = (article.categories ?? []).length > 0;
  const hasKeywords = (article.keywords ?? []).length > 0;

  if (!hasCategories && !hasKeywords) {
    return null;
  }

  return (
    <div
      className={cn('flex w-full flex-wrap gap-1', className)}
      data-testid="article-category-keywords"
      {...rest}
    >
      <ArticleCategories article={article} className="contents" />
      <ArticleKeywords article={article} className="contents" />
    </div>
  );
}
