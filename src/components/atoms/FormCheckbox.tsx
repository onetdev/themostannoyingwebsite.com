import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type FormCheckbox = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  onValueChange?: (value: boolean) => void;
};
const FormCheckbox = ({ onChange, onValueChange, ...rest }: FormCheckbox) => {
  const onChangeProxy = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onValueChange?.(e.target.checked);
  };

  return <input type="checkbox" onChange={onChangeProxy} {...rest} />;
};

export default FormCheckbox;
