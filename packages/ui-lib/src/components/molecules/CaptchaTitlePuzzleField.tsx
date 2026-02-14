'use client';

import { useFormContext } from 'react-hook-form';

import { CaptchaTilePuzzle } from '../atoms';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '../organisms/Field';

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
    <Field>
      <FieldLabel>{text.label}</FieldLabel>
      <FieldContent>
        <FieldDescription>{text.hint}</FieldDescription>
        <CaptchaTilePuzzle
          className="border-foreground my-3 rounded-md border"
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
        <FieldError errors={[errors[fieldName]]} />
      </FieldContent>
    </Field>
  );
}
