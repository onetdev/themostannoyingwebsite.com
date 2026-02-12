'use client';

import { FormFieldError, LabelText, Input } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

interface PasswordConfirmationFieldProps {
  fieldName?: string;
}

export function PasswordConfirmationField({
  fieldName = 'passwordConfirmation',
}: PasswordConfirmationFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <>
      <label htmlFor={fieldName}>
        <LabelText className="mb-1">
          {t('user.field.passwordConfirmation')}
        </LabelText>
        <Input
          type="password"
          className="w-full"
          id={fieldName}
          {...register(fieldName)}
        />
      </label>
      <FormFieldError error={errors[fieldName]} />
    </>
  );
}
