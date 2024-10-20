import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

export type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  appendPlaceholder?: boolean;
  values: { value: string | number; label: string | number }[];
  onValueChange?: (value: string) => void;
};

const Select = ({
  appendPlaceholder = true,
  className,
  values,
  onChange,
  onValueChange,
  ...rest
}: SelectProps) => {
  const onChangeProxy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e);
    onValueChange?.(values[e.target.selectedIndex].value.toString());
  };

  return (
    <select
      onChange={onChangeProxy}
      className={`rounded-lg border border-primary bg-surface p-2 text-on-surface ${className}`}
      {...rest}>
      {appendPlaceholder && <option value=""></option>}
      {values.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
