import type { Article, ArticleListItem } from '@maw/content-sdk';
import type { ComponentProps } from 'react';
import { Link } from '@/core/i18n/navigation';

export type TextListItemProps = ComponentProps<'article'> & {
  article: Article | ArticleListItem;
};

export function TextListItem({ article, ...rest }: TextListItemProps) {
  return (
    <article {...rest}>
      <Link
        href={`/articles/${article.slug}`}
        passHref
        className="link-as-inherit hover-text-primary"
        prefetch={false}
      >
        <h4 className="line-clamp-1 leading-tight" title={article.title}>
          {article.title}
        </h4>
        <small
          className="text-card-foreground my-2 line-clamp-2"
          title={article.summary}
        >
          {article.summary}
        </small>
      </Link>
    </article>
  );
}
