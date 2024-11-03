import { FunctionComponent, PropsWithChildren } from 'react';

export type FormRowProps = PropsWithChildren<{
  label: string;
  reverse?: boolean;
}>;

const FormRow: FunctionComponent<FormRowProps> = ({
  label,
  children,
  reverse = false,
}) => {
  return (
    <label
      data-reverse={reverse.toString()}
      className="flex items-center gap-3 data-[reverse=true]:flex-row-reverse data-[reverse=true]:justify-between">
      {children}
      <span>{label}</span>
    </label>
  );
};

export default FormRow;
