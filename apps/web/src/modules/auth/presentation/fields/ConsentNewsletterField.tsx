'use client';

import { Checkbox, FormFieldError } from '@maw/ui-lib';
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
    <>
      <label htmlFor={fieldName} className="flex items-center gap-2">
        <Checkbox id={fieldName} {...register(fieldName)} />
        <span className="inline-block text-lg font-semibold">
          {t('user.field.consentNewsletter')}
        </span>
      </label>
      <FormFieldError error={errors[fieldName]} />
    </>
  );
}
