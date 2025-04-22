'use client';

import { FormFieldError, PasswordStrengthBar, TextInput } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

interface PasswordCreateFieldProps {
  fieldName?: string;
}

const validate = (value: string, t: ReturnType<typeof useTranslations>) => {
  // Split up in this way to annoy the user the most
  if (!value.match(/[A-Z]/)) {
    return t('form.validation.error.missingUppercase');
  } else if (!value.match(/[a-z]/)) {
    return t('form.validation.error.missingLowercase');
  } else if (!value.match(/[0-9]/)) {
    return t('form.validation.error.missingNumber');
  } else if (!value.match(/[^A-Za-z0-9]/)) {
    return t('form.validation.error.missingSpecialCharacter');
  }

  const numbers = value.match(/[0-9]/g) ?? [];
  const sumOfNumbers = numbers.map(Number).reduce((a, b) => a + b, 0);
  if (sumOfNumbers < 30) {
    return t('form.validation.error.sumOfNumbersGte', {
      count: 30,
    });
  }

  if (sumOfNumbers % 2) {
    return t('form.validation.error.sumOfNumbersMustBeEven');
  }

  return t('form.validation.error.passwordAlreadyTaken');
};

export function PasswordCreateField({
  fieldName = 'password',
}: PasswordCreateFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    register,
    watch,
  } = useFormContext();

  const password = watch(fieldName);

  const passwordStrenghtText = {
    weak: t('form.validation.passwordStrength.weak'),
    okay: t('form.validation.passwordStrength.okay'),
    veryStrong: t('form.validation.passwordStrength.veryStrong'),
  };

  return (
    <>
      <label>
        <h4 className="mb-1">{t('user.field.password')}</h4>
        <TextInput
          type="password"
          className="w-full"
          {...register(fieldName, {
            required: t('form.validation.error.required'),
            minLength: {
              value: 12,
              message: t('form.validation.error.minLength', { count: 12 }),
            },
            validate: (value) => validate(value, t),
          })}
        />
        <PasswordStrengthBar
          className="mt-3"
          password={password}
          text={passwordStrenghtText}
        />
      </label>
      <FormFieldError error={errors[fieldName]} />
    </>
  );
}
