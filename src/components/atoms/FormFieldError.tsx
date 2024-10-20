import { FunctionComponent } from 'react';
import { FieldError } from 'react-hook-form';

export type FormFieldErrorProps = {
  error?: FieldError;
};

const FormFieldError: FunctionComponent<FormFieldErrorProps> = ({ error }) => {
  return (
    <>
      {error && (
        <small className="mt-1 block text-error">{error?.message}</small>
      )}
    </>
  );
};

export default FormFieldError;
