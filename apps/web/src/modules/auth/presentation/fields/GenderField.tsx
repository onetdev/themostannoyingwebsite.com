'use client';

import { DropdownSelect, FormFieldError, LabelText } from '@maw/ui-lib';
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
    <div>
      <label>
        <LabelText className="mb-1">{t('user.field.gender')}</LabelText>
        <DropdownSelect
          placeholder=""
          values={genderOptions}
          className="w-full"
          aria-label={t('user.field.gender')}
          {...register(fieldName)}
        />
      </label>
      <FormFieldError error={errors[fieldName]} />
    </div>
  );
}
