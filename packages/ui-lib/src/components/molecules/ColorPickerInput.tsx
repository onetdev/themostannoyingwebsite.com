import { getRelativeLuminance } from '@maw/utils/color';
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

import { Icon } from '../atoms';

export type ColorPickerInputSize = 'sm' | 'md' | 'lg';
export type ColorPickerInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' | 'size'
> & {
  onValueChange?: (value: boolean) => void;
  size?: ColorPickerInputSize;
  displayValue?: string;
};

const resolveVariant = (size: ColorPickerInputSize) => {
  let className: string;
  switch (size) {
    case 'sm':
      className = 'w-6 h-4';
      break;
    case 'lg':
      className = 'h-7 w-11';
      break;
    case 'md':
    default:
      className = 'h-5 w-8';
      break;
  }

  return className;
};

export const ColorPickerInput = forwardRef<
  HTMLInputElement,
  ColorPickerInputProps
>(
  (
    {
      onChange,
      onValueChange,
      size = 'md',
      displayValue = '#eeeeee',
      ...rest
    }: ColorPickerInputProps,
    ref,
  ) => {
    const sizeClassName = resolveVariant(size);
    const contrastingColor =
      (getRelativeLuminance(displayValue) || 0) < 0.5 ? '#eeeeee' : '#333333';

    const onChangeProxy = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.checked);
    };

    return (
      <span
        className={`group relative flex items-center justify-center ${sizeClassName}`}>
        <input
          type="color"
          className="peer/colorpicker absolute z-20 size-full cursor-pointer opacity-0 disabled:cursor-auto"
          ref={ref}
          {...rest}
          onChange={onChangeProxy}
        />
        <Icon
          icon="colorPicker"
          className="z-20 h-3"
          style={{ color: contrastingColor }}
        />
        <span
          className="peer-checked/colorpicker:bg-primary absolute size-full rounded-md shadow-inner transition-all duration-150 ease-in-out peer-disabled/colorpicker:grayscale"
          style={{ backgroundColor: displayValue as string }}></span>
      </span>
    );
  },
);

ColorPickerInput.displayName = 'ColorPickerInput';
