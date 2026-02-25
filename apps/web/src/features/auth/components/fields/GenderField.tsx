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
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { GenderList } from '../../schemas';

interface GenderFieldProps {
  fieldName?: string;
  required?: boolean;
}

export function GenderField({
  fieldName = 'gender',
  required,
}: GenderFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const genderOptions = useMemo(() => {
    const pool = GenderList.reduce(
      (acc, gender) => {
        acc[gender] = t(`user.genderVariants.${gender}`);
        return acc;
      },
      {} as Record<string, string>,
    );

    return GenderList.map((gender) => ({
      value: gender,
      label: pool[gender],
    }));
  }, [t]);

  return (
    <Field>
      <FieldLabel required={required}>{t('user.field.gender')}</FieldLabel>
      <FieldContent>
        <Controller
          control={control}
          name={fieldName}
          render={({ field, fieldState }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                className="w-full"
                aria-label={t('user.field.gender')}
                aria-invalid={fieldState.invalid}>
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors[fieldName]]} />
      </FieldContent>
    </Field>
  );
}
