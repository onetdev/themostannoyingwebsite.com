'use client';

import { useFormContext } from 'react-hook-form';

import { CaptchaEmoji, Input } from '../atoms';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '../organisms/Field';

export type CaptchaEmojiFieldProps = {
  className?: string;
  fieldName?: string;
  required?: boolean;
  text: {
    label: string;
    hint: string;
  };
};

export function CaptchaEmojiField({
  className,
  fieldName = 'captcha',
  required,
  text,
}: CaptchaEmojiFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Field className={className}>
      <FieldLabel required={required}>{text.label}</FieldLabel>
      <FieldContent>
        <FieldDescription>{text.hint}</FieldDescription>
        <CaptchaEmoji
          className="border-foreground my-3 rounded-md border"
          width={300}
          height={100}
        />
        <Input
          type="text"
          className="w-[300px]"
          aria-label={text.label}
          {...register(fieldName)}
        />
        <FieldError errors={[errors[fieldName]]} />
      </FieldContent>
    </Field>
  );
}
