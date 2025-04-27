'use client';

import { DropdownSelect, FormFieldError, LabelText } from '@maw/ui-lib';
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
    <>
      <label htmlFor={fieldName}>
        <LabelText className="mb-1">{t('user.field.countryCode')}</LabelText>
        <DropdownSelect
          placeholder=""
          className="w-full"
          id={fieldName}
          aria-label={t('user.field.countryCode')}
          values={countryOptions}
          {...register(fieldName, {
            required: t('form.validation.error.required'),
          })}
        />
      </label>
      <FormFieldError error={errors[fieldName]} />
    </>
  );
}
