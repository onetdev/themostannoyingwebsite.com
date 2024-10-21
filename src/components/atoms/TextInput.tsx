import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

import { FormElementSize, resolveFormElementSize } from '@/utils/form';

export type TextInputSize = FormElementSize;
export type TextInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
> & {
  onValueChange?: (value: string) => void;
  size?: TextInputSize;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      onChange,
      onValueChange,
      size,
      className: classNameExternal,
      ...rest
    }: TextInputProps,
    ref,
  ) => {
    const className = resolveFormElementSize(size || 'md');

    const onChangeProxy = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    return (
      <input
        type="text"
        ref={ref}
        className={`${className} ${classNameExternal} rounded-lg border border-primary bg-surface text-on-surface`}
        onChange={onChangeProxy}
        {...rest}
      />
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
