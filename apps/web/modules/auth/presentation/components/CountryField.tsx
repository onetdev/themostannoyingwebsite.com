'use client';

import { DropdownSelect, FormFieldError } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import countryData from '@/root/public/assets/countries.json';

interface CountryFieldProps {
  fieldName?: string;
}

export function CountryField({ fieldName = 'countryCode' }: CountryFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    register,
  } = useFormContext();

  const countryOptions = useMemo(
    () =>
      countryData.map(({ localName, code }) => ({
        label: localName,
        value: code,
      })),
    // Maybe a bit more annoying without a sort
    //.sort((a, b) => a.label.localeCompare(b.label))
    [],
  );

  return (
    <div>
      <label>
        <h5 className="mb-1">{t('user.field.countryCode')}</h5>
        <DropdownSelect
          placeholder=""
          className="w-full"
          values={countryOptions}
          {...register(fieldName, {
            required: t('form.validation.error.required'),
          })}
        />
      </label>
      <FormFieldError error={errors[fieldName]} />
    </div>
  );
}
