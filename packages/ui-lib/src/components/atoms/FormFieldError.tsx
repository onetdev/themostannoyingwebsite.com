import { FunctionComponent } from 'react';
import { FieldError } from 'react-hook-form';

export type FormFieldErrorProps = {
  error?: FieldError;
};

export const FormFieldError: FunctionComponent<FormFieldErrorProps> = ({
  error,
}) => {
  return (
    <>
      {error && (
        <small className="text-error mt-1 block">{error?.message}</small>
      )}
    </>
  );
};
