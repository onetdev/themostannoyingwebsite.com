import { useTranslation } from '@/lib/utils/i18n';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';

import FormFieldError from '@/components/atoms/FormFieldError';
import Select from '@/components/atoms/Select';
import { type CommonRegistrationFormFieldProps } from '@/features/auth';

type DateOfBirthFieldProps = Pick<
  CommonRegistrationFormFieldProps,
  'errors' | 'register' | 'setValue'
>;

const DateOfBirthField: FunctionComponent<DateOfBirthFieldProps> = ({
  errors,
  register,
  setValue,
}) => {
  const { t } = useTranslation('common');
  const [parts, setParts] = useState({ year: '', month: '', day: '' });

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

  const onYearChange = (value: string) => setParts({ ...parts, year: value });
  const onMonthChange = (value: string) => setParts({ ...parts, month: value });
  const onDayChange = (value: string) => setParts({ ...parts, day: value });

  useEffect(() => {
    const anyEmpty = !parts.year || !parts.month || !parts.day;
    setValue(
      'dateOfBirth',
      anyEmpty ? '' : `${parts.year}-${parts.month}-${parts.day}`,
    );
  }, [parts, setValue]);

  return (
    <div>
      <label>
        <h5 className="mb-1">{t('user.field.dateOfBirth')}</h5>
        <div className="flex gap-3">
          <Select
            className="w-1/4"
            values={dateOfBirthYear}
            onValueChange={onYearChange}
          />
          <Select
            className="w-2/4"
            values={dateOfBirthMonth}
            onValueChange={onMonthChange}
          />
          <Select
            className="w-1/4"
            values={dateOfBirthDay}
            onValueChange={onDayChange}
          />
        </div>
      </label>
      <input
        type="hidden"
        {...register('dateOfBirth', {
          required: t('form.validation.error.required'),
        })}
      />
      <FormFieldError error={errors.dateOfBirth} />
    </div>
  );
};

export default DateOfBirthField;
