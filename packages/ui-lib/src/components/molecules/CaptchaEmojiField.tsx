'use client';

import { useFormContext } from 'react-hook-form';

import { CaptchaEmoji } from '../atoms/CaptchaEmoji';
import { FormFieldError } from '../atoms/FormFieldError';
import { TextInput } from '../atoms/TextInput';

export type CaptchaEmojiFieldProps = {
  fieldName?: string;
  text: {
    label: string;
    hint: string;
    required: string;
    invalid: string;
  };
};

export function CaptchaEmojiField({
  fieldName = 'captch',
  text,
}: CaptchaEmojiFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <label>
        <h4 className="mb-1">{text.label}</h4>
        <small>{text.hint}</small>
        <CaptchaEmoji
          className="border-on-background my-3 rounded-md border"
          width={300}
          height={100}
        />
        <TextInput
          type="text"
          className="w-[300px]"
          {...register(fieldName, {
            required: text.required,
            pattern: {
              value: /^[XyZ123]{444}$/,
              message: text.invalid,
            },
          })}
        />
      </label>
      <FormFieldError error={errors[fieldName]} />
    </div>
  );
}
