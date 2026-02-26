import type { FunctionComponent } from 'react';
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export type FormFieldErrorProps = {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

export const FormFieldError: FunctionComponent<FormFieldErrorProps> = ({
  error,
}) => {
  return (
    <>
      {error && (
        <small className="text-error mt-1 block">
          {error?.message?.toString()}
        </small>
      )}
    </>
  );
};
