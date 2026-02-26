'use client';

import { Checkbox, Field, FieldLabel } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

interface ConsentNewsletterFieldProps {
  fieldName?: string;
  required?: boolean;
}

export function ConsentNewsletterField({
  fieldName = 'consentNewsletter',
  required,
}: ConsentNewsletterFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <Field orientation="horizontal" className="items-center gap-2">
      <Checkbox id={fieldName} {...register(fieldName)} />
      <FieldLabel
        htmlFor={fieldName}
        className="font-semibold"
        required={required}
        aria-invalid={!!errors[fieldName]}
      >
        {t('user.field.consentNewsletter')}
      </FieldLabel>
    </Field>
  );
}
