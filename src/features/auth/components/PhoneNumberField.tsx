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
    <>
      <label>
        <h5 className="mb-1">{t('user.phoneNumber')}</h5>
        <div className="flex gap-3">
          <Select
            className="w-1/4"
            values={phoneCountryOptions}
            {...register('countryCode', {
              required: t('validation.errors.required'),
            })}
          />
          <div className="flex w-3/4 ">
            <TextInput
              type="number"
              disabled
              className="grow rounded-r-none"
              {...register('phoneNumber', {
                required: t('validation.errors.required'),
              })}
            />
            <div className="flex flex-col">
              <Button
                className="rounded-none rounded-tr-lg"
                size="sm"
                onMouseDown={onPhoneNumberIncrementClick}>
                +
              </Button>
              <Button
                className="rounded-none rounded-br-lg"
                variant="secondary"
                size="sm"
                onMouseDown={onPhoneNumberDecrementClick}>
                -
              </Button>
            </div>
          </div>
        </div>
      </label>
      {errors.phoneNumber && (
        <small className="mt-1 block text-error">
          {errors.phoneNumber?.message}
        </small>
      )}
    </>
  );
};

export default PhoneNumberField;
