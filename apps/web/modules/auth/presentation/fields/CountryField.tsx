'use client';

import { DropdownSelect, FormFieldError, LabelText } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useKernelService } from '@/kernel';

interface CountryFieldProps {
  fieldName?: string;
}

export function CountryField({ fieldName = 'countryCode' }: CountryFieldProps) {
  const t = useTranslations();
  const kernelService = useKernelService();
  const {
    formState: { errors },
    register,
  } = useFormContext();

  const [countryOptions, setCountryOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    kernelService.getAllCountries().then((data) => {
      setCountryOptions(
        data.map(({ localName, code }) => ({
          label: localName,
          value: code,
        })),
      );
    });
  }, [kernelService]);

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
          {...register(fieldName)}
        />
      </label>
      <FormFieldError error={errors[fieldName]} />
    </>
  );
}
