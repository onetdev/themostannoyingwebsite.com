'use client';

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import {
  type MouseEvent,
  type TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useKernelService } from '@/kernel';

interface PhoneNumberFieldProps {
  fieldName?: string;
  countryCodeFieldName?: string;
  required?: boolean;
}

export function PhoneNumberField({
  fieldName = 'phoneNumber',
  countryCodeFieldName = 'phoneNumberCountry',
  required,
}: PhoneNumberFieldProps) {
  const t = useTranslations();
  const kernelService = useKernelService();
  const {
    formState: { errors },
    register,
    setValue,
    getValues,
    control,
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
        data.map(({ localName, phone, code }) => ({
          label: `${phone} ${localName}`,
          value: `${code} ${phone}`,
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

  const fieldError = [errors[countryCodeFieldName] ?? errors[fieldName]];

  return (
    <Field>
      <FieldLabel required={required}>{t('user.field.phoneNumber')}</FieldLabel>
      <FieldContent>
        <div className="flex gap-3">
          <Controller
            control={control}
            name={countryCodeFieldName}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className="w-1/4"
                  aria-label={t('user.field.phoneNumberCountryCode')}
                  aria-invalid={fieldError.length > 0}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {phoneCountryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <InputGroup className="w-3/4">
            <InputGroupAddon align="inline-start">
              <InputGroupButton
                ref={$decrementBtn}
                variant="outline"
                aria-label={t('user.field.phoneNumberDecrease')}
                onMouseDown={onDecrementClick}
                onTouchStart={onDecrementClick}>
                -
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupInput
              type="number"
              disabled
              aria-label={t('user.field.phoneNumberAreaCode')}
              className="select-none"
              aria-invalid={fieldError.length > 0}
              {...register(fieldName)}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                ref={$incrementBtn}
                variant="outline"
                aria-label={t('user.field.phoneNumberIncrease')}
                onMouseDown={onIncrementClick}
                onTouchStart={onIncrementClick}>
                +
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <FieldError
          errors={[errors[countryCodeFieldName] ?? errors[fieldName]]}
        />
      </FieldContent>
    </Field>
  );
}
