import { ComponentProps } from 'react';

import { FormElementSize, resolveFormElementSize } from '../../utils/form';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = FormElementSize;

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

interface ButtonAsButtonProps
  extends BaseButtonProps, ComponentProps<'button'> {
  behavior?: 'button';
}

interface ButtonAsLinkProps extends BaseButtonProps, ComponentProps<'a'> {
  behavior: 'link';
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

// Only responsible for the background and text color
const resolveVariant = (variant: ButtonVariant) => {
  let className: string;
  switch (variant) {
    case 'secondary':
      className =
        'bg-secondary text-on-secondary border border-border-secondary hover:bg-secondary-alt';
      break;
    case 'tertiary':
      className =
        'bg-tertiary text-on-tertiary border border-border-tertiary hover:bg-tertiary-alt';
      break;
    case 'primary':
    default:
      className =
        'bg-primary text-on-primary border border-border-primary hover:bg-primary-alt';
      break;
  }

  return className;
};

export function Button({
  behavior = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classNameVariant = resolveVariant(variant);
  const classNameSize = resolveFormElementSize(size);
  const finalClassName = ` text-center cursor-pointer rounded-md transition-all duration-150 ease-in-out disabled:cursor-default disabled:grayscale link-customized ${classNameVariant} ${classNameSize} ${className ?? ''}`;

  const sharedProps = {
    variant,
    size,
    className: finalClassName,
  };

  if (behavior === 'link') {
    return (
      <a {...sharedProps} {...(rest as ComponentProps<'a'>)}>
        {children}
      </a>
    );
  }

  return (
    <button {...sharedProps} {...(rest as ComponentProps<'button'>)}>
      {children}
    </button>
  );
}
