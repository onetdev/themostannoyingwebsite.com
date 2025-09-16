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
        <Checkbox {...register(fieldName)} />
        <h4>{t('user.field.consentNewsletter')}</h4>
      </label>
      <FormFieldError error={errors[fieldName]} />
    </>
  );
}
