import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  Input,
} from '@maw/ui-lib';
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
    <Field>
      <FieldLabel htmlFor={fieldName}>{t('user.field.email')}</FieldLabel>
      <FieldContent>
        <Input
          type="email"
          className="w-full"
          id={fieldName}
          aria-invalid={!!errors[fieldName]}
          {...register(fieldName)}
        />
        <FieldError errors={[errors[fieldName]]} />
      </FieldContent>
    </Field>
  );
}
