import { FunctionComponent, useMemo } from 'react';

import { FormFieldError, DropdownSelect } from '@maw/ui';
import { CommonRegistrationFormFieldProps } from '@/features/auth';
import countryData from '@/root/public/assets/countries.json';
import { useTranslations } from 'next-intl';

type CountryFieldProps = Pick<
  CommonRegistrationFormFieldProps,
  'errors' | 'register'
>;

const CountryField: FunctionComponent<CountryFieldProps> = ({
  errors,
  register,
}) => {
  const t = useTranslations();
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
          {...register('countryCode', {
            required: t('form.validation.error.required'),
          })}
        />
      </label>
      <FormFieldError error={errors.countryCode} />
    </div>
  );
};

export default CountryField;
