'use client';

import {
  Button,
  DropdownSelect,
  FormFieldError,
  LabelText,
  TextInput,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import {
  type MouseEvent,
  type TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';

import { useKernelService } from '@/root/modules/kernel';

interface PhoneNumberFieldProps {
  fieldName?: string;
  countryCodeFieldName?: string;
}

export function PhoneNumberField({
  fieldName = 'phoneNumber',
  countryCodeFieldName = 'phoneNumberCountry',
}: PhoneNumberFieldProps) {
  const t = useTranslations();
  const kernelService = useKernelService();
  const {
    formState: { errors },
    register,
    setValue,
    getValues,
  } = useFormContext();

  const $decrementBtn = useRef<HTMLButtonElement>(null);
  const $incrementBtn = useRef<HTMLButtonElement>(null);
  const [phoneNumberUpdateDirection, setPhoneNumberUpdateDirection] =
    useState(0);

  const [phoneCountryOptions, setPhoneCountryOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    kernelService.getAllCountries().then((data) => {
      setPhoneCountryOptions(
        data.map(({ localName, phone }) => ({
          label: `${phone} ${localName}`,
          value: phone,
        })),
      );
    });
  }, [kernelService]);

  useEffect(() => {
    if (phoneNumberUpdateDirection === 0) {
      return;
    }

    const timer = setInterval(() => {
      let newValue: number = getValues(fieldName) || 0;
      if (phoneNumberUpdateDirection > 0) {
        newValue = (getValues(fieldName) || 0) + 1;
      } else if (phoneNumberUpdateDirection < 0) {
        newValue = Math.max((getValues(fieldName) || 0) - 1, 1);
      }

      setValue(fieldName, newValue, {
        shouldValidate: false,
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [fieldName, getValues, phoneNumberUpdateDirection, setValue]);

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
        <LabelText className="mb-1">{t('user.field.phoneNumber')}</LabelText>
        <div className="flex gap-3">
          <DropdownSelect
            placeholder=""
            className="w-1/4"
            aria-label={t('user.field.phoneNumberCountryCode')}
            values={phoneCountryOptions}
            {...register(countryCodeFieldName, {
              required: t('form.validation.error.required'),
            })}
          />
          <div className="flex w-3/4">
            <Button
              ref={$decrementBtn}
              type="button"
              className="rounded-none rounded-l-lg px-3 select-none"
              variant="primary"
              size="sm"
              aria-label={t('user.field.phoneNumberDecrease')}
              onMouseDown={onDecrementClick}
              onTouchStart={onDecrementClick}>
              -
            </Button>
            <TextInput
              type="number"
              disabled
              aria-label={t('user.field.phoneNumberAreaCode')}
              className="max-w-44 rounded-none border-x-0 select-none"
              {...register(fieldName, {
                required: t('form.validation.error.required'),
              })}
            />
            <Button
              ref={$incrementBtn}
              type="button"
              className="rounded-none rounded-r-lg px-3"
              size="sm"
              aria-label={t('user.field.phoneNumberIncrease')}
              onMouseDown={onIncrementClick}
              onTouchStart={onIncrementClick}>
              +
            </Button>
          </div>
        </div>
      </label>
      {errors[countryCodeFieldName] ? (
        <FormFieldError error={errors[countryCodeFieldName]} />
      ) : (
        <FormFieldError error={errors[fieldName]} />
      )}
    </div>
  );
}
