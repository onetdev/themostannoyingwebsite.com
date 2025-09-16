'use client';

import { useFormContext } from 'react-hook-form';

import { CaptchaEmoji, FormFieldError, LabelText, TextInput } from '../atoms';

export type CaptchaEmojiFieldProps = {
  fieldName?: string;
  text: {
    label: string;
    hint: string;
  };
};

export function CaptchaEmojiField({
  fieldName = 'captcha',
  text,
}: CaptchaEmojiFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <label>
        <LabelText className="mb-1">{text.label}</LabelText>
        <p className="text-sm">{text.hint}</p>
        <CaptchaEmoji
          className="border-on-background my-3 rounded-md border"
          width={300}
          height={100}
        />
        <TextInput
          type="text"
          className="w-[300px]"
          aria-label={text.label}
          {...register(fieldName)}
        />
      </label>
      <FormFieldError error={errors[fieldName]} />
    </div>
  );
}
