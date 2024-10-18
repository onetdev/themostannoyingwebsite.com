import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

export type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  values: { value: string; label: string }[];
  selected: string;
  onValueChange: (value: string) => void;
};

const Select = ({
  className,
  values,
  onChange,
  onValueChange,
  ...rest
}: SelectProps) => {
  const onChangeProxy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e);
    onValueChange?.(values[e.target.selectedIndex].value);
  };

  return (
    <select
      onChange={onChangeProxy}
      className={`rounded-lg border border-primary bg-surface p-2 text-on-surface ${className}`}
      {...rest}>
      {values.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
