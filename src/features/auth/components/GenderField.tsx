import { useTranslation } from 'next-i18next';
import { FunctionComponent, useMemo } from 'react';

import FormFieldError from '@/components/atoms/FormFieldError';
import Select from '@/components/atoms/Select';
import {
  CommonRegistrationFormFieldProps,
  userGenderList,
} from '@/features/auth';

type GenderFieldProps = Pick<
  CommonRegistrationFormFieldProps,
  'errors' | 'register'
>;
const GenderField: FunctionComponent<GenderFieldProps> = ({
  register,
  errors,
}) => {
  const { t } = useTranslation('common');

  const genderOptions = useMemo(() => {
    const pool = t('genders', {
      returnObjects: true,
      defaultValue: [],
    }) as Record<string, string>;

    return userGenderList.map((gender) => ({
      value: gender,
      label: pool[gender],
    }));
  }, [t]);

  return (
    <>
      <label>
        <h5 className="mb-1">{t('auth.field.gender')}</h5>
        <Select
          values={genderOptions}
          className="w-full"
          {...register('gender')}
        />
      </label>
      <FormFieldError error={errors.gender} />
    </>
  );
};

export default GenderField;
