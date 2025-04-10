import { FunctionComponent, useMemo } from 'react';

import { FormFieldError, DropdownSelect } from '@maw/ui';
import {
  CommonRegistrationFormFieldProps,
  userGenderList,
} from '@/features/auth';
import { useTranslations } from 'next-intl';

type GenderFieldProps = Pick<
  CommonRegistrationFormFieldProps,
  'errors' | 'register'
>;
const GenderField: FunctionComponent<GenderFieldProps> = ({
  register,
  errors,
}) => {
  const t = useTranslations();

  const genderOptions = useMemo(() => {
    const pool = userGenderList.reduce((acc, gender) => {
      acc[gender] = t(`user.genderVariants.${gender}`);
      return acc;
    }, {} as Record<string, string>);

    return userGenderList.map((gender) => ({
      value: gender,
      label: pool[gender],
    }));
  }, [t]);

  return (
    <>
      <label>
        <h5 className="mb-1">{t('user.field.gender')}</h5>
        <DropdownSelect
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
