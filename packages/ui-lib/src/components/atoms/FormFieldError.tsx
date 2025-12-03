import { FunctionComponent } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export type FormFieldErrorProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
