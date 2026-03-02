'use client';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@maw/ui-lib';
import { useFormContext } from 'react-hook-form';
import { CaptchaGridSelect } from './CaptchaGridSelect';

export type CaptchaGridSelectFieldProps = {
  fieldName?: string;
  imageSrc: string;
  required?: boolean;
  prompt: string;
  text: {
    label: string;
    hint: string;
    invalid: string;
  };
};

export function CaptchaGridSelectField({
  fieldName = 'captcha',
  imageSrc,
  required,
  prompt,
  text,
}: CaptchaGridSelectFieldProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <Field>
      <FieldLabel required={required}>{text.label}</FieldLabel>
      <FieldContent>
        <FieldDescription>{text.hint}</FieldDescription>
        <div className="my-3 flex justify-center">
          <CaptchaGridSelect
            imageSrc={imageSrc}
            prompt={prompt}
            onResolved={() => setValue(fieldName, 'true')}
          />
        </div>
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
