'use client';

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  Input,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

interface NicknameFieldProps {
  fieldName?: string;
  required?: boolean;
}

export function NicknameField({
  fieldName = 'nickname',
  required,
}: NicknameFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <Field>
      <FieldLabel htmlFor={fieldName} required={required}>
        {t('user.field.nickname')}
      </FieldLabel>
      <FieldContent>
        <Input
          type="text"
          className="w-full"
          id={fieldName}
          aria-invalid={!!errors[fieldName]}
          {...register(fieldName)}
        />
        <FieldError errors={[errors[fieldName]]} />
      </FieldContent>
    </Field>
  );
}
