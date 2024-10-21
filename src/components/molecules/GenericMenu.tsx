import { FunctionComponent } from 'react';

export type GenericMenuProps = Omit<JSXProxyProps<'ul'>, 'children'> & {
  children?: JSX.Element[];
  iteratorClassName?: string;
};

export const GenericMenu: FunctionComponent<GenericMenuProps> = ({
  children,
  className,
  iteratorClassName,
  ...props
}) => (
  <ul
    className={`flex flex-wrap gap-x-3 font-primary text-lg ${className}`}
    {...props}>
    {children?.map((child, index) => (
      <li key={index} className={iteratorClassName}>
        {child}
      </li>
    ))}
  </ul>
);
