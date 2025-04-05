import { FunctionComponent } from 'react';

import FormFieldError from '@/components/atoms/FormFieldError';
import PasswordStrengthBar from '@/components/atoms/PasswordStrengthBar';
import TextInput from '@/components/atoms/TextInput';
import { type CommonRegistrationFormFieldProps } from '@/features/auth';
import { useTranslations } from 'next-intl';

type PasswordCreateFieldProps = Pick<
  CommonRegistrationFormFieldProps,
  'errors' | 'register' | 'watch'
>;

const PasswordCreateField: FunctionComponent<PasswordCreateFieldProps> = ({
  errors,
  register,
  watch,
}) => {
  const t = useTranslations();

  const password = watch('password');

  return (
    <>
      <label>
        <h4 className="mb-1">{t('user.field.password')}</h4>
        <TextInput
          type="password"
          className="w-full"
          {...register('password', {
            required: t('form.validation.error.required'),
            minLength: {
              value: 12,
              message: t('form.validation.error.minLength', { count: 12 }),
            },
            validate: (value) => {
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

              const numbers = value.match(/[0-9]/g) || [];
              const sumOfNumbers = numbers
                .map(Number)
                .reduce((a, b) => a + b, 0);
              if (sumOfNumbers < 30) {
                return t('form.validation.error.sumOfNumbersGte', {
                  count: 30,
                });
              }

              if (sumOfNumbers % 2) {
                return t('form.validation.error.sumOfNumbersMustBeEven');
              }

              return t('form.validation.error.passwordAlreadyTaken');
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
