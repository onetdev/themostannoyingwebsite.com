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

interface LastNameFieldProps {
  fieldName?: string;
}

export function LastNameField({ fieldName = 'lastName' }: LastNameFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <Field>
      <FieldLabel htmlFor={fieldName}>{t('user.field.lastName')}</FieldLabel>
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
