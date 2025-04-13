import { DetailedHTMLProps, forwardRef, SelectHTMLAttributes } from 'react';

export type DropdownSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  placeholder?: string;
  values: { value: string | number; label: string | number }[];
  onValueChange?: (value?: string) => void;
};

export const DropdownSelect = forwardRef<HTMLSelectElement, DropdownSelectProps>(
  (
    {
      placeholder,
      className,
      values,
      onChange,
      onValueChange,
      ...rest
    },
    ref,
  ) => {
    const onChangeProxy = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e);
      onValueChange?.(values[e.target.selectedIndex]?.value.toString());
    };

    return (
      <select
        onChange={onChangeProxy}
        className={`rounded-lg border border-primary bg-surface p-2 text-on-surface ${className}`}
        ref={ref}
        {...rest}>
        {typeof placeholder !== "undefined" && <option value="">{placeholder}</option>}
        {values.map(({ value, label }) => (
          <option key={`${value}-${label}`} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  },
);

DropdownSelect.displayName = 'DropdownSelect';
