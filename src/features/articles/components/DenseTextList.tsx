import { FunctionComponent, PropsWithoutRef } from 'react';

import { TextListItem } from '@/features/articles/components/TextListItem';
import { ArticleCore } from '@/types';

type Props = PropsWithoutRef<JSX.IntrinsicElements['ul']> & {
  items: ArticleCore[];
};

export const DenseTextList: FunctionComponent<Props> = ({
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