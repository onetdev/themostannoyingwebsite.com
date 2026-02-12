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
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useKernelService } from '@/kernel';

interface CountryFieldProps {
  fieldName?: string;
}

export function CountryField({ fieldName = 'countryCode' }: CountryFieldProps) {
  const t = useTranslations();
  const kernelService = useKernelService();
  const {
    formState: { errors },
    control,
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
    <Field>
      <FieldLabel htmlFor={fieldName}>{t('user.field.countryCode')}</FieldLabel>
      <FieldContent>
        <Controller
          control={control}
          name={fieldName}
          render={({ field, fieldState }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                className="w-full"
                id={fieldName}
                aria-label={t('user.field.countryCode')}
                aria-invalid={fieldState.invalid}>
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                {countryOptions.map((option) => (
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
