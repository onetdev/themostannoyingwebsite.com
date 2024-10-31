import { FunctionComponent } from 'react';

import { type ArticleDatum, TextListItem } from '@/features/articles';

type DenseTextListProps = JSXProxyProps<'ul'> & {
  items: ArticleDatum[];
};

export const DenseTextList: FunctionComponent<DenseTextListProps> = ({
  items,
  className = '',
  ...rest
}) => {
  return (
    <ul className={`flex flex-col gap-3 ${className}`} {...rest}>
      {items.map((item, index) => (
        <li
          key={index}
          className="relative after:absolute after:w-full after:border-b after:border-b-hr-surface">
          <TextListItem article={item} />
        </li>
      ))}
    </ul>
  );
};
