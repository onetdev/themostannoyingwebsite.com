import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

export type TextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  onValueChange?: (value: string) => void;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ onChange, onValueChange, className, ...rest }: TextInputProps, ref) => {
    const onChangeProxy = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    return (
      <input
        type="text"
        ref={ref}
        className={`${className} rounded-lg border border-primary bg-surface p-2 text-on-surface`}
        onChange={onChangeProxy}
        {...rest}
      />
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
