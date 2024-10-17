import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type TextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  onValueChange?: (value: string) => void;
};

const TextInput = ({
  onChange,
  onValueChange,
  className,
  ...rest
}: TextInputProps) => {
  const onChangeProxy = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onValueChange?.(e.target.value);
  };

  return (
    <input
      type="text"
      className={`${className} rounded-lg border border-primary bg-surface p-2 text-on-surface`}
      onChange={onChangeProxy}
      {...rest}
    />
  );
};

export default TextInput;
