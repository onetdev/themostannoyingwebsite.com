'use client';

import { FormFieldError, LabelText, Input } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

interface NicknameFieldProps {
  fieldName?: string;
}

export function NicknameField({ fieldName = 'nickname' }: NicknameFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <>
      <label htmlFor={fieldName}>
        <LabelText className="mb-1">{t('user.field.nickname')}</LabelText>
        <Input
          type="text"
          className="w-full"
          id={fieldName}
          {...register(fieldName)}
        />
      </label>
      <FormFieldError error={errors[fieldName]} />
    </>
  );
}
