'use client';

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  Input,
  PasswordStrengthBar,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

interface PasswordCreateFieldProps {
  fieldName?: string;
  required?: boolean;
}

export function PasswordCreateField({
  fieldName = 'password',
  required,
}: PasswordCreateFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    register,
    watch,
  } = useFormContext();

  const password = watch(fieldName);

  const passwordStrengthText = {
    label: t('user.field.passwordStrength'),
    weak: t('form.validation.passwordStrength.weak'),
    okay: t('form.validation.passwordStrength.okay'),
    veryStrong: t('form.validation.passwordStrength.veryStrong'),
  };

  return (
    <Field>
      <FieldLabel htmlFor={fieldName} required={required}>
        {t('user.field.password')}
      </FieldLabel>
      <FieldContent>
        <Input
          type="password"
          className="w-full"
          id={fieldName}
          aria-invalid={!!errors[fieldName]}
          {...register(fieldName)}
        />
        <PasswordStrengthBar
          className="mt-3"
          password={password}
          text={passwordStrengthText}
        />
        <FieldError errors={[errors[fieldName]]} />
      </FieldContent>
    </Field>
  );
}
