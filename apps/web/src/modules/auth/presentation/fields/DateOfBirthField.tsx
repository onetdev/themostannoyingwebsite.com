'use client';

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@maw/ui-lib';
import { useMessages, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface DateOfBirthFieldProps {
  fieldName?: string;
  required?: boolean;
}

export function DateOfBirthField({
  fieldName = 'dateOfBirth',
  required,
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
      fieldName,
      anyEmpty ? '' : `${parts.year}-${parts.month}-${parts.day}`,
      { shouldValidate: true },
    );
  }, [parts, setValue, fieldName]);

  return (
    <Field>
      <FieldLabel required={required}>{t('user.field.dateOfBirth')}</FieldLabel>
      <FieldContent>
        <div className="flex gap-3">
          <Select onValueChange={onYearChange}>
            <SelectTrigger
              className="w-1/4"
              aria-label={t('user.field.dateOfBirthYear')}
              aria-invalid={!!errors[fieldName]}>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {dateOfBirthYear.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={onMonthChange}>
            <SelectTrigger
              className="w-2/4"
              aria-label={t('user.field.dateOfBirthMonth')}
              aria-invalid={!!errors[fieldName]}>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {dateOfBirthMonth.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={onDayChange}>
            <SelectTrigger
              className="w-1/4"
              aria-label={t('user.field.dateOfBirthDay')}
              aria-invalid={!!errors[fieldName]}>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {dateOfBirthDay.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <input type="hidden" {...register(fieldName)} />
        <FieldError errors={[errors[fieldName]]} />
      </FieldContent>
    </Field>
  );
}
