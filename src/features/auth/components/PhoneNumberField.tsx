import { useTranslation } from 'next-i18next';
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import TextInput from '@/components/atoms/TextInput';
import { CommonRegistrationFormFieldProps } from '@/features/auth/types';
import countryData from '@/public/assets/countries.json';
import FormFieldError from '@/root/src/components/atoms/FormFieldError';

type PhoneNumberFieldProps = Pick<
  CommonRegistrationFormFieldProps,
  'errors' | 'register' | 'setValue' | 'getValues'
>;

const PhoneNumberField: FunctionComponent<PhoneNumberFieldProps> = ({
  errors,
  register,
  setValue,
  getValues,
}) => {
  const { t } = useTranslation('common');
  const [phoneNumberUpdateDirection, setPhoneNumberUpdateDirection] =
    useState(0);

  const phoneCountryOptions = useMemo(
    () =>
      countryData
        .filter(({ code }) => code !== 'US')
        .map(({ localName, phone }) => ({
          label: `${phone} ${localName}`,
          value: phone,
        })),
    [],
  );

  useEffect(() => {
    if (phoneNumberUpdateDirection === 0) {
      return;
    }

    const timer = setInterval(() => {
      if (phoneNumberUpdateDirection > 0) {
        setValue('phoneNumber', (getValues('phoneNumber') || 0) + 1);
      } else if (phoneNumberUpdateDirection < 0) {
        setValue(
          'phoneNumber',
          Math.max((getValues('phoneNumber') || 0) - 1, 1),
        );
      }
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [getValues, phoneNumberUpdateDirection, setValue]);

  const onMouseUp = useCallback(() => setPhoneNumberUpdateDirection(0), []);

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);

    return () => window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseUp]);

  const onPhoneNumberIncrementClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setPhoneNumberUpdateDirection(phoneNumberUpdateDirection + 1);
  };

  const onPhoneNumberDecrementClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setPhoneNumberUpdateDirection(phoneNumberUpdateDirection - 1);
  };

  return (
    <div>
      <label>
        <h5 className="mb-1">{t('user.phoneNumber')}</h5>
        <div className="flex gap-3">
          <Select
            className="w-1/4"
            values={phoneCountryOptions}
            {...register('phoneNumberCountry', {
              required: t('validation.errors.required'),
            })}
          />
          <div className="flex w-3/4 ">
            <Button
              className="rounded-none rounded-l-lg"
              variant="primary"
              size="sm"
              onMouseDown={onPhoneNumberDecrementClick}>
              -
            </Button>
            <TextInput
              type="number"
              disabled
              className="grow rounded-none"
              {...register('phoneNumber', {
                required: t('validation.errors.required'),
              })}
            />
            <Button
              className="rounded-none rounded-r-lg"
              size="sm"
              onMouseDown={onPhoneNumberIncrementClick}>
              +
            </Button>
          </div>
        </div>
      </label>
      {errors.phoneNumberCountry ? (
        <FormFieldError error={errors.phoneNumberCountry} />
      ) : (
        <FormFieldError error={errors.phoneNumber} />
      )}
    </div>
  );
};

export default PhoneNumberField;
