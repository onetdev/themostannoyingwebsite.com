'use client';

import { FormFieldError, Input, LabelText } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

interface UsernameFieldProps {
  fieldName?: string;
}

export function UsernameField({ fieldName = 'username' }: UsernameFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <>
      <label htmlFor={fieldName}>
        <LabelText className="mb-1">{t('user.field.username')}</LabelText>
        <Input
          type="text"
          className="w-full"
          id={fieldName}
          aria-invalid={!!errors[fieldName]}
          {...register(fieldName)}
        />
      </label>
      <FormFieldError error={errors[fieldName]} />
    </>
  );
}
