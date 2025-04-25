import { FormFieldError, TextInput } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { EMAIL_PATTERN } from '@/utils/validator';

interface EmailFieldProps {
  fieldName?: string;
}

export function EmailField({ fieldName = 'email' }: EmailFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <>
      <label>
        <h4 className="mb-1">{t('user.field.email')}</h4>
        <TextInput
          type="email"
          className="w-full"
          {...register(fieldName, {
            required: t('form.validation.error.required'),
            pattern: {
              value: EMAIL_PATTERN,
              message: t('form.validation.error.emailInvalid'),
            },
          })}
        />
      </label>
      <FormFieldError error={errors[fieldName]} />
    </>
  );
}
