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
    <Field>
      <FieldLabel htmlFor={fieldName}>
        {t('user.field.passwordConfirmation')}
      </FieldLabel>
      <FieldContent>
        <Input
          type="password"
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
