import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import FormFieldError from '@/components/atoms/FormFieldError';
import PasswordStrengthBar from '@/components/atoms/PasswordStrengthBar';
import TextInput from '@/components/atoms/TextInput';
import { type CommonRegistrationFormFieldProps } from '@/features/auth';

type PasswordCreateFieldProps = Pick<
  CommonRegistrationFormFieldProps,
  'errors' | 'register' | 'watch'
>;

const PasswordCreateField: FunctionComponent<PasswordCreateFieldProps> = ({
  errors,
  register,
  watch,
}) => {
  const { t } = useTranslation('common');

  const password = watch('password');

  return (
    <>
      <label>
        <h4 className="mb-1">{t('auth.field.password')}</h4>
        <TextInput
          type="password"
          className="w-full"
          {...register('password', {
            required: t('validation.errors.required'),
            minLength: {
              value: 12,
              message: t('validation.errors.minLength', { count: 12 }),
            },
            validate: (value) => {
              // Split up in this way to annoy the user the most
              if (!value.match(/[A-Z]/)) {
                return t('validation.errors.missingUppercase');
              } else if (!value.match(/[a-z]/)) {
                return t('validation.errors.missingLowercase');
              } else if (!value.match(/[0-9]/)) {
                return t('validation.errors.missingNumber');
              } else if (!value.match(/[^A-Za-z0-9]/)) {
                return t('validation.errors.missingSpecialCharacter');
              }

              const numbers = value.match(/[0-9]/g) || [];
              const sumOfNumbers = numbers
                .map(Number)
                .reduce((a, b) => a + b, 0);
              if (sumOfNumbers < 30) {
                return t('validation.errors.sumOfNumbersGte', {
                  count: 30,
                });
              }

              if (sumOfNumbers % 2) {
                return t('validation.errors.sumOfNumbersMustBeEven');
              }

              return t('validation.errors.passwordAlreadyTaken');
            },
          })}
        />
        <PasswordStrengthBar className="mt-3" password={password} />
      </label>
      <FormFieldError error={errors.password} />
    </>
  );
};

export default PasswordCreateField;
