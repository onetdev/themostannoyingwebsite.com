import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

import { FormElementSize, resolveFormElementSize } from '@/utils/form';

export type TextInputSize = FormElementSize;
export type TextInputVariant = 'primary' | 'secondary' | 'tertiary';
export type TextInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
> & {
  onValueChange?: (value: string) => void;
  size?: TextInputSize;
  variant?: TextInputVariant;
};

// Only responsible for the background and text color
const resolveVariant = (variant: TextInputVariant) => {
  let className: string;
  switch (variant) {
    case 'secondary':
      className =
        'border border-secondary text-on-surface hover:border-secondary-alt';
      break;
    case 'tertiary':
      className =
        'border border-tertiary text-on-surface hover:border-tertiary-alt';
      break;
    case 'primary':
    default:
      className = 'border-primary text-on-surface hover:border-primary-alt';
      break;
  }

  return className;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      onChange,
      onValueChange,
      size = 'md',
      className: classNameExternal,
      variant = 'primary',
      ...rest
    }: TextInputProps,
    ref,
  ) => {
    const classNameVariant = resolveVariant(variant);
    const className = resolveFormElementSize(size);

    const onChangeProxy = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    return (
      <input
        type="text"
        ref={ref}
        className={`${className} ${classNameVariant} ${classNameExternal} rounded-lg border border-primary bg-surface text-on-surface`}
        onChange={onChangeProxy}
        {...rest}
      />
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
