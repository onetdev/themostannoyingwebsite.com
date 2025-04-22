'use client';

import { DropdownSelect, FormFieldError } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { GenderList } from '../../domain';

interface GenderFieldProps {
  fieldName?: string;
}

export function GenderField({ fieldName = 'gender' }: GenderFieldProps) {
  const t = useTranslations();
  const {
    formState: { errors },
    register,
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
    <>
      <label>
        <h5 className="mb-1">{t('user.field.gender')}</h5>
        <DropdownSelect
          placeholder=""
          values={genderOptions}
          className="w-full"
          {...register(fieldName)}
        />
      </label>
      <FormFieldError error={errors['fieldName']} />
    </>
  );
}
