import { useTranslation } from 'next-i18next';
import {
  type FunctionComponent,
  type MouseEvent,
  type TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
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
  const $decrementBtn = useRef<HTMLButtonElement>(null);
  const $incrementBtn = useRef<HTMLButtonElement>(null);
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

  const onStopEvent = useCallback(() => setPhoneNumberUpdateDirection(0), []);
  const preventLongTapSelection: EventListenerOrEventListenerObject =
    useCallback((e: Event) => {
      e.preventDefault();
    }, []);

  useEffect(() => {
    window.addEventListener('mouseup', onStopEvent);
    window.addEventListener('touchend', onStopEvent);

    // There's no onSelectStart on the element so we need to rely on this
    // oldschool way. This is required to avoid long-tap related selection.
    // And before you ask, select-none doesn't cover this.
    $decrementBtn.current?.addEventListener(
      'selectstart',
      preventLongTapSelection,
    );
    $incrementBtn.current?.addEventListener(
      'selectstart',
      preventLongTapSelection,
    );

    return () => {
      window.removeEventListener('mouseup', onStopEvent);
      window.removeEventListener('touchend', onStopEvent);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      $decrementBtn.current?.removeEventListener(
        'selectstart',
        preventLongTapSelection,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      $incrementBtn.current?.removeEventListener(
        'selectstart',
        preventLongTapSelection,
      );
    };
  }, [onStopEvent, preventLongTapSelection]);

  const onIncrementClick = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    setPhoneNumberUpdateDirection(1);
  };

  const onDecrementClick = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    setPhoneNumberUpdateDirection(-1);
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
          <div className="flex w-3/4">
            <Button
              ref={$decrementBtn}
              type="button"
              className="select-none rounded-none rounded-l-lg px-3"
              variant="primary"
              size="sm"
              onMouseDown={onDecrementClick}
              onTouchStart={onDecrementClick}>
              -
            </Button>
            <TextInput
              type="number"
              disabled
              className="max-w-44 select-none rounded-none border-x-0"
              {...register('phoneNumber', {
                required: t('validation.errors.required'),
              })}
            />
            <Button
              ref={$incrementBtn}
              type="button"
              className="rounded-none rounded-r-lg px-3"
              size="sm"
              onMouseDown={onIncrementClick}
              onTouchStart={onIncrementClick}>
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
