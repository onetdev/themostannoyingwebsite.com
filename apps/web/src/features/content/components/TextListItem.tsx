import { FunctionComponent } from 'react';

import { type ArticleDatum } from '@/features/content';
import { Link } from '@/i18n/navigation';

type TextListItemProps = JSXProxyProps<'article'> & {
  article: ArticleDatum;
};

export const TextListItem: FunctionComponent<TextListItemProps> = ({
  article,
  ...rest
}) => {
  return (
    <article role="article" {...rest}>
      <Link href={article.url} passHref prefetch={false}>
        <h4 className="leading-tight">{article.title}</h4>
        <small className="text-on-surface my-2 block">{article.intro}</small>
      </Link>
    </article>
  );
};
