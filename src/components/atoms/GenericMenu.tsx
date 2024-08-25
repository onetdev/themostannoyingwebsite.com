import { FunctionComponent } from 'react';

type Props = Omit<JSX.IntrinsicElements['ul'], 'children'> & {
  children?: JSX.Element[];
  iteratorClassName?: string;
};
export const GenericMenu: FunctionComponent<Props> = ({
  children,
  className,
  iteratorClassName,
  ...props
}) => (
  <ul
    className={`my-2 flex flex-wrap gap-3 font-primary text-lg ${className}`}
    {...props}>
    {children?.map((child, index) => (
      <li key={index} className={iteratorClassName}>
        {child}
      </li>
    ))}
  </ul>
);
