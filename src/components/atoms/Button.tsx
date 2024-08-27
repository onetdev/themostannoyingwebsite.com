import { FunctionComponent, PropsWithoutRef } from 'react';

type Props = PropsWithoutRef<JSX.IntrinsicElements['button']> & {
  variant?: 'primary' | 'secondary' | 'tertiary';
};

const Button: FunctionComponent<Props> = ({
  variant = 'primary',
  children,
  ...rest
}) => {
  switch (variant) {
    case 'secondary':
      return (
        <ButtonInternal
          className="bg-secondary text-on-secondary hover:bg-secondary-alt"
          {...rest}>
          {children}
        </ButtonInternal>
      );
    case 'tertiary':
      return (
        <ButtonInternal
          className="bg-tertiary text-on-tertiary hover:bg-tertiary-alt"
          {...rest}>
          {children}
        </ButtonInternal>
      );
    case 'primary':
    default:
      return (
        <ButtonInternal
          className="bg-primary text-on-primary hover:bg-primary-alt"
          {...rest}>
          {children}
        </ButtonInternal>
      );
  }
};

const ButtonInternal: FunctionComponent<Props> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={`cursor-pointer transition-all duration-100 ease-in-out disabled:cursor-default disabled:grayscale ${className}`}
      {...rest}>
      {children}
    </button>
  );
};

export default Button;
