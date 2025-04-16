import { FunctionComponent } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { CaptchaTilePuzzle } from '../atoms/CaptchaTilePuzzle';
import { FormFieldError } from '../atoms/FormFieldError';

export type CaptchaTitlePuzzleFieldProps = {
  errors: FieldErrors<CaptchaFormInputs>;
  register: UseFormRegister<CaptchaFormInputs>;
  setValue: UseFormSetValue<CaptchaFormInputs>;
  text: {
    label: string;
    hint: string;
    invalid: string;
  };
};

export const CaptchaTitlePuzzleField: FunctionComponent<
  CaptchaTitlePuzzleFieldProps
> = ({ register, errors, setValue, text }) => {
  return (
    <div className="flex flex-col">
      <h4 className="mb-1">{text.label}</h4>
      <small>{text.hint}</small>
      <CaptchaTilePuzzle
        className="border-on-background my-3 rounded-md border"
        cols={6}
        rows={4}
        imageSrc="/assets/images/captcha-tile-abstract.jpg"
        onResolved={() => setValue('captcha', 'true')}
      />
      <input
        type="hidden"
        {...register('captcha', {
          required: text.invalid,
        })}
      />
      <FormFieldError error={errors.captcha} />
    </div>
  );
};
