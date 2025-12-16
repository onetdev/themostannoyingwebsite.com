import { FunctionComponent } from 'react';

import { Link } from '@/i18n/navigation';
import { type ArticleDatum } from '@/modules/content';

type TextListItemProps = JSXProxyProps<'article'> & {
  article: ArticleDatum;
};

export const TextListItem: FunctionComponent<TextListItemProps> = ({
  article,
  ...rest
}) => {
  return (
    <article role="article" {...rest}>
      <Link
        href={article.url}
        passHref
        className="as-text hover-text-primary"
        prefetch={false}>
        <h4 className="line-clamp-1 leading-tight" title={article.title}>
          {article.title}
        </h4>
        <small
          className="text-on-surface my-2 line-clamp-2"
          title={article.intro}>
          {article.intro}
        </small>
      </Link>
    </article>
  );
};
