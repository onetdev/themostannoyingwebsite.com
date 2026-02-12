'use client';

import { Checkbox, Field, FieldError, FieldLabel } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

interface ConsentPrivacyPolicyFieldProps {
  fieldName?: string;
}

export function ConsentPrivacyPolicyField({
  fieldName = 'consentPrivacyPolicy',
}: ConsentPrivacyPolicyFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <Field orientation="horizontal" className="items-center gap-2">
      <Checkbox id={fieldName} {...register(fieldName)} />
      <FieldLabel htmlFor={fieldName} className="text-lg font-semibold">
        {t('user.field.consentPrivacyPolicy')}
      </FieldLabel>
      <FieldError errors={[errors[fieldName]]} />
    </Field>
  );
}
