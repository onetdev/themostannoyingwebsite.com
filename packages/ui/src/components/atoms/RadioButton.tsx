import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

export type RadioButtonSize = 'sm' | 'md' | 'lg';
export type RadioButtonProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' | 'size'
> & {
  onValueChange?: (value: boolean) => void;
  size?: RadioButtonSize;
};

const resolveVariant = (size: RadioButtonSize) => {
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

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    { onChange, onValueChange, size = 'md', ...rest }: RadioButtonProps,
    ref,
  ) => {
    const sizeClassName = resolveVariant(size);

    const onChangeProxy = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.checked);
    };

    return (
      <span
        className={`group relative flex items-center justify-center ${sizeClassName}`}>
        <input
          type="radio"
          className="peer/radio absolute z-20 size-full cursor-pointer opacity-0 disabled:cursor-auto"
          ref={ref}
          {...rest}
          onChange={onChangeProxy}
        />
        <span className="absolute size-full rounded-full border border-primary transition-all duration-150 ease-in-out peer-checked/radio:border-[6px] peer-disabled/radio:grayscale"></span>
      </span>
    );
  },
);

RadioButton.displayName = 'RadioButton';
