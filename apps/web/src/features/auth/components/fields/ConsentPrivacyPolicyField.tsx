'use client';

import { Checkbox, Field, FieldError, FieldLabel } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

interface ConsentPrivacyPolicyFieldProps {
  fieldName?: string;
  required?: boolean;
}

export function ConsentPrivacyPolicyField({
  fieldName = 'consentPrivacyPolicy',
  required,
}: ConsentPrivacyPolicyFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <Field orientation="horizontal" className="items-center gap-2">
      <Checkbox
        id={fieldName}
        {...register(fieldName)}
        aria-invalid={!!errors[fieldName]}
      />
      <FieldLabel
        htmlFor={fieldName}
        className="font-semibold"
        required={required}
      >
        {t('user.field.consentPrivacyPolicy')}
      </FieldLabel>
    </Field>
  );
}
