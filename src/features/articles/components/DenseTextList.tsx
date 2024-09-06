import { FunctionComponent } from 'react';

import { TextListItem } from '@/features/articles/components/TextListItem';
import { ArticleCore } from '@/features/articles/types';

type DenseTextListProps = JSXProxyProps<'ul'> & {
  items: ArticleCore[];
};

export const DenseTextList: FunctionComponent<DenseTextListProps> = ({
  items,
  className,
  ...rest
}) => {
  return (
    <ul className={`flex flex-col gap-3 ${className}`} {...rest}>
      {items.map((item, index) => (
        <li
          key={index}
          className="relative after:absolute after:w-full after:border-b after:border-b-secondary after:opacity-20">
          <TextListItem article={item} />
        </li>
      ))}
    </ul>
  );
};
