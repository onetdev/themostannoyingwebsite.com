'use client';

import { Checkbox, Field, FieldError, FieldLabel } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

interface ConsentNewsletterFieldProps {
  fieldName?: string;
}

export function ConsentNewsletterField({
  fieldName = 'consentNewsletter',
}: ConsentNewsletterFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <Field orientation="horizontal" className="items-center gap-2">
      <Checkbox id={fieldName} {...register(fieldName)} />
      <FieldLabel htmlFor={fieldName} className="text-lg font-semibold">
        {t('user.field.consentNewsletter')}
      </FieldLabel>
      <FieldError errors={[errors[fieldName]]} />
    </Field>
  );
}
