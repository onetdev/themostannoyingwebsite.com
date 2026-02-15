import { FunctionComponent } from 'react';
import { GlobalError } from 'react-hook-form';

export type FormErrorProps = {
  error?: GlobalError;
};

export const FormError: FunctionComponent<FormErrorProps> = ({ error }) => {
  return (
    <>
      {error && (
        <div className="bg-error text-error-foreground block rounded-md px-3 py-2">
          {error?.message?.toString()}
        </div>
      )}
    </>
  );
};
