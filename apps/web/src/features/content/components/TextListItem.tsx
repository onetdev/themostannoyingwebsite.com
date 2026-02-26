import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import type { ArticleDatum } from '../schemas';

export type TextListItemProps = ComponentProps<'article'> & {
  article: ArticleDatum;
};

export function TextListItem({ article, ...rest }: TextListItemProps) {
  return (
    <article {...rest}>
      <Link
        href={article.url}
        passHref
        className="link-as-inherit hover-text-primary"
        prefetch={false}
      >
        <h4 className="line-clamp-1 leading-tight" title={article.title}>
          {article.title}
        </h4>
        <small
          className="text-card-foreground my-2 line-clamp-2"
          title={article.intro}
        >
          {article.intro}
        </small>
      </Link>
    </article>
  );
}
