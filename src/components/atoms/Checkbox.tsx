import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type Checkbox = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
> & {
  onValueChange?: (value: boolean) => void;
};

const Checkbox = ({ onChange, onValueChange, ...rest }: Checkbox) => {
  const onChangeProxy = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onValueChange?.(e.target.checked);
  };

  return <input type="checkbox" onChange={onChangeProxy} {...rest} />;
};

export default Checkbox;
