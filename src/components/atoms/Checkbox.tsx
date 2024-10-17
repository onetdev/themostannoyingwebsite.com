import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

export type CheckboxProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
> & {
  onValueChange?: (value: boolean) => void;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ onChange, onValueChange, ...rest }: CheckboxProps, ref) => {
    const onChangeProxy = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.checked);
    };

    return (
      <input type="checkbox" ref={ref} {...rest} onChange={onChangeProxy} />
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
