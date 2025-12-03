'use client';

import {
  FormFieldError,
  LabelText,
  PasswordStrengthBar,
  TextInput,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

interface PasswordCreateFieldProps {
  fieldName?: string;
}

export function PasswordCreateField({
  fieldName = 'password',
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
    <>
      <label htmlFor={fieldName}>
        <LabelText className="mb-1">{t('user.field.password')}</LabelText>
        <TextInput
          type="password"
          className="w-full"
          id={fieldName}
          {...register(fieldName)}
        />
      </label>
      <PasswordStrengthBar
        className="mt-3"
        password={password}
        text={passwordStrengthText}
      />
      <FormFieldError error={errors[fieldName]} />
    </>
  );
}
