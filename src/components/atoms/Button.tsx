import { forwardRef } from 'react';

import { FormElementSize, resolveFormElementSize } from '@/utils/form';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = FormElementSize;
export type ButtonProps = JSXProxyProps<'button'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

// Only responsible for the background and text color
const resolveVariant = (variant: ButtonVariant) => {
  let className: string;
  switch (variant) {
    case 'secondary':
      className = 'bg-secondary text-on-secondary hover:bg-secondary-alt';
      break;
    case 'tertiary':
      className = 'bg-tertiary text-on-tertiary hover:bg-tertiary-alt';
      break;
    case 'primary':
    default:
      className = 'bg-primary text-on-primary hover:bg-primary-alt';
      break;
  }

  return className;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className: classNameExternal,
      children,
      ...rest
    }: ButtonProps,
    ref,
  ) => {
    const classNameVariant = resolveVariant(variant);
    const classNameSize = resolveFormElementSize(size);

    return (
      <button
        ref={ref}
        className={`cursor-pointer rounded-md transition-all duration-150 ease-in-out disabled:cursor-default disabled:grayscale ${classNameVariant} ${classNameSize} ${classNameExternal}`}
        {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
