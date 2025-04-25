'use client';

import { DropdownSelect, FormFieldError } from '@maw/ui-lib';
import { useMessages, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface DateOfBirthFieldProps {
  fieldName?: string;
}

export function DateOfBirthField({
  fieldName = 'dateOfBirth',
}: DateOfBirthFieldProps) {
  const t = useTranslations();
  const messages = useMessages();
  const [parts, setParts] = useState({ year: '', month: '', day: '' });
  const {
    formState: { errors },
    register,
    setValue,
  } = useFormContext();

  const dateOfBirthYear = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 500 }, (_, i) => ({
      value: currentYear - i,
      label: currentYear - i,
    })).reverse();
  }, []);

  const dateOfBirthMonth = useMemo(() => {
    const monthLabels = Object.keys(messages.date.months).map((key) =>
      t(`date.months.${key}`),
    );

    return Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      label: monthLabels[i],
    })).sort((a, b) => a.label.localeCompare(b.label));
  }, [t, messages]);

  const dateOfBirthDay = useMemo(() => {
    return Array.from({ length: 31 }, (_, i) => ({
      value: i + 1,
      label: i + 1,
    }));
  }, []);

  const onYearChange = (value?: string) =>
    setParts({ ...parts, year: value ?? '' });
  const onMonthChange = (value?: string) =>
    setParts({ ...parts, month: value ?? '' });
  const onDayChange = (value?: string) =>
    setParts({ ...parts, day: value ?? '' });

  useEffect(() => {
    const anyEmpty = !parts.year || !parts.month || !parts.day;
    setValue(
      'dateOfBirth',
      anyEmpty ? '' : `${parts.year}-${parts.month}-${parts.day}`,
    );
  }, [parts, setValue]);

  return (
    <>
      <label>
        <h5 className="mb-1">{t('user.field.dateOfBirth')}</h5>
        <div className="flex gap-3">
          <DropdownSelect
            placeholder=""
            className="w-1/4"
            values={dateOfBirthYear}
            onValueChange={onYearChange}
          />
          <DropdownSelect
            placeholder=""
            className="w-2/4"
            values={dateOfBirthMonth}
            onValueChange={onMonthChange}
          />
          <DropdownSelect
            placeholder=""
            className="w-1/4"
            values={dateOfBirthDay}
            onValueChange={onDayChange}
          />
        </div>
      </label>
      <input
        type="hidden"
        {...register(fieldName, {
          required: t('form.validation.error.required'),
        })}
      />
      <FormFieldError error={errors[fieldName]} />
    </>
  );
}
