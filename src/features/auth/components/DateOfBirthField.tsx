import { useTranslation } from 'next-i18next';
import { FunctionComponent, useMemo } from 'react';

import Select from '@/components/atoms/Select';
import { CommonRegistrationFormFieldProps } from '@/features/auth/types';

type DateOfBirthFieldProps = Pick<
  CommonRegistrationFormFieldProps,
  'errors' | 'register'
>;

const DateOfBirthField: FunctionComponent<DateOfBirthFieldProps> = ({
  errors,
  register,
}) => {
  const { t } = useTranslation('common');

  const dateOfBirthYear = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 500 }, (_, i) => ({
      value: currentYear - i,
      label: currentYear - i,
    })).reverse();
  }, []);

  const dateOfBirthMonth = useMemo(() => {
    const monthLabels = t('date.months', {
      returnObjects: true,
      defaultValue: [],
    }) as string[];
    return Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      label: monthLabels[i],
    })).sort((a, b) => a.label.localeCompare(b.label));
  }, [t]);

  const dateOfBirthDay = useMemo(() => {
    return Array.from({ length: 31 }, (_, i) => ({
      value: i + 1,
      label: i + 1,
    }));
  }, []);

  return (
    <>
      <label>
        <h5 className="mb-1">{t('user.dateOfBirth')}</h5>
        <div className="flex gap-3">
          <Select className="w-1/4" values={dateOfBirthYear} />
          <Select className="w-2/4" values={dateOfBirthMonth} />
          <Select className="w-1/4" values={dateOfBirthDay} />
        </div>
      </label>
      <input
        type="hidden"
        {...register('dateOfBirth', {
          required: t('validation.errors.required'),
        })}
      />
      {errors.dateOfBirth && (
        <small className="mt-1 block text-error">
          {errors.dateOfBirth?.message}
        </small>
      )}
    </>
  );
};

export default DateOfBirthField;
