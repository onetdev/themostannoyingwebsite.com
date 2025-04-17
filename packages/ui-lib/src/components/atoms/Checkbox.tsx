import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

import { Icon } from './Icon';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' | 'size'
> & {
  onValueChange?: (value: boolean) => void;
  size?: CheckboxSize;
};

const resolveVariant = (size: CheckboxSize) => {
  let className: string;
  switch (size) {
    case 'sm':
      className = 'size-4';
      break;
    case 'lg':
      className = 'size-7';
      break;
    case 'md':
    default:
      className = 'size-5';
      break;
  }

  return className;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ onChange, onValueChange, size = 'md', ...rest }: CheckboxProps, ref) => {
    const sizeClassName = resolveVariant(size);

    const onChangeProxy = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.checked);
    };

    return (
      <span
        className={`group relative flex items-center justify-center ${sizeClassName} shrink-0`}>
        <input
          type="checkbox"
          className="peer/checkbox absolute z-20 size-full cursor-pointer opacity-0 disabled:cursor-auto"
          ref={ref}
          {...rest}
          onChange={onChangeProxy}
        />
        <Icon
          icon="check"
          className="peer-checked/checkbox:text-on-primary z-10 opacity-0 transition-all duration-150 ease-in-out peer-checked/checkbox:opacity-100"
          size={size}
        />
        <span className="border-primary peer-checked/checkbox:bg-primary absolute size-full rounded-md border transition-all duration-150 ease-in-out peer-disabled/checkbox:grayscale"></span>
      </span>
    );
  },
);

Checkbox.displayName = 'Checkbox';
