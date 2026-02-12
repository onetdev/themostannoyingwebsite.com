import { FormFieldError, Input, LabelText } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

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
      <label htmlFor={fieldName}>
        <LabelText className="mb-1">{t('user.field.email')}</LabelText>
        <Input
          type="email"
          className="w-full"
          id={fieldName}
          aria-invalid={!!errors[fieldName]}
          {...register(fieldName)}
        />
      </label>
      <FormFieldError error={errors[fieldName]} />
    </>
  );
}
