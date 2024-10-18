import { FunctionComponent } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
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

// Only responsible for the text size and padding
const resolveSize = (size: ButtonSize) => {
  let className: string;

  switch (size) {
    case 'xs':
      className = 'p-1 text-xs';
      break;
    case 'sm':
      className = 'px-2 py-1 text-sm';
      break;
    case 'lg':
      className = 'px-3 py-2 text-lg';
      break;
    case 'xl':
      className = 'px-3 py-2 text-xl';
      break;
    case '2xl':
      className = 'px-3 py-2 text-2xl';
      break;
    case '3xl':
      className = 'px-3 py-2 text-3xl';
      break;
    case '4xl':
      className = 'px-3 py-2 text-4xl';
      break;
    case 'md':
    default:
      className = 'px-3 py-1 text-md';
      break;
  }
  return className;
};

const Button: FunctionComponent<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className: classNameExternal,
  children,
  ...rest
}) => {
  const classNameVariant = resolveVariant(variant);
  const classNameSize = resolveSize(size);

  return (
    <button
      className={`cursor-pointer rounded-md transition-all duration-100 ease-in-out disabled:cursor-default disabled:grayscale ${classNameVariant} ${classNameSize} ${classNameExternal}`}
      {...rest}>
      {children}
    </button>
  );
};

export default Button;
