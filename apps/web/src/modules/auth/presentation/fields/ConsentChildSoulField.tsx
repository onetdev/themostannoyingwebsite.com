'use client';

import { Checkbox, Field, FieldLabel } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

interface ConsentChildSoulFieldProps {
  fieldName?: string;
  required?: boolean;
}

export function ConsentChildSoulField({
  fieldName = 'consentChildSoul',
  required,
}: ConsentChildSoulFieldProps) {
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
        required={required}>
        {t('user.field.consentChildSoul')}
      </FieldLabel>
    </Field>
  );
}
