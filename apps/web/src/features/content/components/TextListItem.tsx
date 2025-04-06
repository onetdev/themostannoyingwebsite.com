import { Link } from '@/root/apps/web/src/i18n/navigation';
import { FunctionComponent } from 'react';

import { type ArticleDatum } from '@/root/apps/web/src/features/content';

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
        <small className="my-2 block text-on-surface">{article.intro}</small>
      </Link>
    </article>
  );
};
