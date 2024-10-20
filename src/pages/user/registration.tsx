import { NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/atoms/Button';
import CaptchaEmoji from '@/components/atoms/CaptchaEmoji';
import Checkbox from '@/components/atoms/Checkbox';
import PageHeadline from '@/components/atoms/PageHeadline';
import PasswordStrengthBar from '@/components/atoms/PasswordStrengthBar';
import Select from '@/components/atoms/Select';
import SiteTitle from '@/components/atoms/SiteTitle';
import TextInput from '@/components/atoms/TextInput';
import countryData from '@/public/assets/countries.json';
import { makeI18nStaticProps } from '@/utils/i18n';

type RegistrationFormInputs = {
  consentNewsletter: boolean;
  consentPrivacyPolicy: boolean;
  birthDate: string;
  captcha: string;
  countryCode: string;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
  phoneNumber?: string;
  username: string;
};

const Registration: NextPage = () => {
  const { t } = useTranslation('common');
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormInputs>();

  const onSubmit: SubmitHandler<RegistrationFormInputs> = (_data) => {
    alert(t('user.registrationError'));
  };

  const password = watch('password');
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
    <main className="mx-auto max-w-[500px] py-14">
      <SiteTitle>{t('navigation.registration')}</SiteTitle>
      <PageHeadline>{t('navigation.registration')}</PageHeadline>
      <form
        className="flex flex-col gap-5"
        method="post"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-5">
          <div className="grow">
            <label>
              <h4 className="mb-1">{t('user.firstName')}</h4>
              <TextInput
                type="text"
                className="w-full"
                {...register('firstName', {
                  required: t('validation.errors.required'),
                })}
              />
            </label>
            {errors.firstName && (
              <small className="mt-1 block text-error">
                {errors.firstName?.message}
              </small>
            )}
          </div>
          <div className="grow">
            <label>
              <h4 className="mb-1">{t('user.lastName')}</h4>
              <TextInput
                type="text"
                className="w-full"
                {...register('lastName', {
                  required: t('validation.errors.required'),
                })}
              />
            </label>
            {errors.lastName && (
              <small className="mt-1 block text-error">
                {errors.lastName?.message}
              </small>
            )}
          </div>
        </div>
        <div>
          <label>
            <h4 className="mb-1">{t('user.username')}</h4>
            <TextInput
              type="text"
              className="w-full"
              {...register('username', {
                required: t('validation.errors.required'),
              })}
            />
          </label>
          {errors.username && (
            <small className="mt-1 block text-error">
              {errors.username?.message}
            </small>
          )}
        </div>
        <div>
          <label>
            <h4 className="mb-1">{t('user.email')}</h4>
            <TextInput
              type="email"
              className="w-full"
              {...register('email', {
                required: t('validation.errors.required'),
              })}
            />
          </label>
          {errors.email && (
            <small className="mt-1 block text-error">
              {errors.email?.message}
            </small>
          )}
        </div>
        <div>
          <label>
            <h4 className="mb-1">{t('user.password')}</h4>
            <TextInput
              type="password"
              className="w-full"
              {...register('password', {
                required: t('validation.errors.required'),
                minLength: {
                  value: 12,
                  message: t('validation.errors.minLength', { count: 12 }),
                },
                validate: (value) => {
                  // Split up in this way to annoy the user the most
                  if (!value.match(/[A-Z]/)) {
                    return t('validation.errors.missingUppercase');
                  } else if (!value.match(/[a-z]/)) {
                    return t('validation.errors.missingLowercase');
                  } else if (!value.match(/[0-9]/)) {
                    return t('validation.errors.missingNumber');
                  } else if (!value.match(/[^A-Za-z0-9]/)) {
                    return t('validation.errors.missingSpecialCharacter');
                  }

                  const numbers = value.match(/[0-9]/g) || [];
                  const sumOfNumbers = numbers
                    .map(Number)
                    .reduce((a, b) => a + b, 0);
                  if (sumOfNumbers < 30) {
                    return t('validation.errors.sumOfNumbersGte', {
                      count: 30,
                    });
                  }

                  if (sumOfNumbers % 2) {
                    return t('validation.errors.sumOfNumbersMustBeEven');
                  }

                  // TODO: Add additional validation rules

                  return true;
                },
              })}
            />
            <PasswordStrengthBar className="mt-3" password={password} />
          </label>
          {errors.password && (
            <small className="mt-1 block text-error">
              {errors.password?.message}
            </small>
          )}
        </div>
        <div>
          <label>
            <h5 className="mb-1">{t('user.passwordConfirmation')}</h5>
            <TextInput
              type="password"
              className="w-full"
              {...register('passwordConfirmation', {
                validate: (value) => value === getValues('password'),
              })}
            />
          </label>
          {errors.passwordConfirmation && (
            <small className="mt-1 block text-error">
              {errors.passwordConfirmation?.message}
            </small>
          )}
        </div>
        <div>
          <label>
            <h5 className="mb-1">{t('user.phoneNumber')}</h5>
            <TextInput
              className="w-full"
              {...register('phoneNumber', {
                required: t('validation.errors.required'),
              })}
            />
          </label>
          {errors.phoneNumber && (
            <small className="mt-1 block text-error">
              {errors.phoneNumber?.message}
            </small>
          )}
        </div>
        <div>
          <label>
            <h5 className="mb-1">{t('user.countryCode')}</h5>
            <Select
              className="w-full"
              values={countryOptions}
              {...register('countryCode', {
                required: t('validation.errors.required'),
              })}
            />
          </label>
          {errors.countryCode && (
            <small className="mt-1 block text-error">
              {errors.countryCode?.message}
            </small>
          )}
        </div>
        <div>
          <label className="flex items-center gap-2">
            <Checkbox {...register('consentNewsletter')} />
            <h4>{t('user.consentNewsletter')}</h4>
          </label>
          {errors.consentNewsletter && (
            <small className="mt-1 block text-error">
              {errors.consentNewsletter?.message}
            </small>
          )}
        </div>
        <div>
          <label className="flex items-center gap-2">
            <Checkbox {...register('consentPrivacyPolicy')} />
            <h4>{t('user.consentPrivacyPolicy')}</h4>
          </label>
          {errors.consentPrivacyPolicy && (
            <small className="mt-1 block text-error">
              {errors.consentPrivacyPolicy?.message}
            </small>
          )}
        </div>
        <div className="flex flex-col">
          <label>
            <h4 className="mb-1">{t('captcha.field')}</h4>
            <small>{t('captcha.captchaEmojiHint')}</small>
            <CaptchaEmoji
              className="my-3 rounded-md border border-on-background"
              width={300}
              height={100}
            />
            <TextInput
              type="text"
              className="w-[300px]"
              {...register('captcha', {
                required: t('validation.errors.required'),
                pattern: {
                  value: /^[XyZ123]{444}$/,
                  message: t('validation.errors.captchaInvalid'),
                },
              })}
            />
          </label>
          {errors.captcha && (
            <small className="mt-1 block text-error">
              {errors.captcha?.message}
            </small>
          )}
        </div>

        <Button type="submit" className="mt-10" size="lg">
          {t('user.createMyAccount')}
        </Button>
        <div className="flex justify-between">
          <Link href="/user/password-reminder" passHref prefetch={false}>
            {t('user.forgotPassword')}
          </Link>
          <Link href="/user/login" passHref prefetch={false}>
            {t('actions.login')}
          </Link>
        </div>
      </form>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Registration;
