'use client';

import { Checkbox, Field, FieldLabel } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

interface ConsentTermsOfUseFieldProps {
  fieldName?: string;
  required?: boolean;
}

export function ConsentTermsOfUseField({
  fieldName = 'consentTermsOfUse',
  required,
}: ConsentTermsOfUseFieldProps) {
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
        {t('userField.consentTermsOfUse')}
      </FieldLabel>
    </Field>
  );
}
