import { useTranslation } from 'next-i18next';
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import Button from '@/components/atoms/Button';
import FormFieldError from '@/components/atoms/FormFieldError';
import Select from '@/components/atoms/Select';
import TextInput from '@/components/atoms/TextInput';
import { type CommonRegistrationFormFieldProps } from '@/features/auth';
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
      let newValue: number = getValues('phoneNumber') || 0;
      if (phoneNumberUpdateDirection > 0) {
        newValue = (getValues('phoneNumber') || 0) + 1;
      } else if (phoneNumberUpdateDirection < 0) {
        newValue = Math.max((getValues('phoneNumber') || 0) - 1, 1);
      }

      setValue('phoneNumber', newValue, {
        shouldValidate: false,
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [getValues, phoneNumberUpdateDirection, setValue]);

  const onGlobalMouseUp = useCallback(
    () => setPhoneNumberUpdateDirection(0),
    [],
  );

  useEffect(() => {
    window.addEventListener('mouseup', onGlobalMouseUp);

    return () => window.removeEventListener('mouseup', onGlobalMouseUp);
  }, [onGlobalMouseUp]);

  const onIncrementClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setPhoneNumberUpdateDirection(phoneNumberUpdateDirection + 1);
  };

  const onDecrementClick = (e: React.MouseEvent) => {
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
              type="button"
              className="rounded-none rounded-l-lg px-4"
              variant="primary"
              size="sm"
              onMouseDown={onDecrementClick}>
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
              type="button"
              className="rounded-none rounded-r-lg px-4"
              size="sm"
              onMouseDown={onIncrementClick}>
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
