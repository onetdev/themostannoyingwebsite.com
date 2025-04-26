'use client';

import { useFormContext } from 'react-hook-form';

import { CaptchaTilePuzzle } from '../atoms/CaptchaTilePuzzle';
import { FormFieldError } from '../atoms/FormFieldError';

export type CaptchaTitlePuzzleFieldProps = {
  fieldName?: string;
  text: {
    label: string;
    hint: string;
    invalid: string;
  };
};

export function CaptchaTitlePuzzleField({
  fieldName = 'captcha',
  text,
}: CaptchaTitlePuzzleFieldProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <h4 className="mb-1">{text.label}</h4>
      <small>{text.hint}</small>
      <CaptchaTilePuzzle
        className="border-on-background my-3 rounded-md border"
        cols={6}
        rows={4}
        imageSrc="/assets/images/captcha-tile-abstract.jpg"
        onResolved={() => setValue(fieldName, 'true')}
      />
      <input
        type="hidden"
        {...register(fieldName, {
          required: text.invalid,
        })}
      />
      <FormFieldError error={errors[fieldName]} />
    </div>
  );
}
