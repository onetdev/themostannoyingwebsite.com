import { NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/atoms/Button';
import CaptchaEmoji from '@/components/atoms/CaptchaEmoji';
import Checkbox from '@/components/atoms/Checkbox';
import FormFieldError from '@/components/atoms/FormFieldError';
import PageHeadline from '@/components/atoms/PageHeadline';
import Select from '@/components/atoms/Select';
import SiteTitle from '@/components/atoms/SiteTitle';
import TextInput from '@/components/atoms/TextInput';
import {
  DateOfBirthField,
  PasswordCreateField,
  PhoneNumberField,
  RegistrationFormInputs,
  userGenderList,
} from '@/features/auth';
import countryData from '@/public/assets/countries.json';
import { makeI18nStaticProps } from '@/utils/i18n';

const Registration: NextPage = () => {
  const { t } = useTranslation('common');
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormInputs>({
    defaultValues: {
      phoneNumber: 1,
    },
  });

  const genderOptions = useMemo(() => {
    const pool = t('genders', {
      returnObjects: true,
      defaultValue: [],
    }) as Record<string, string>;

    return userGenderList.map((gender) => ({
      value: gender,
      label: pool[gender],
    }));
  }, [t]);

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

  const onSubmit: SubmitHandler<RegistrationFormInputs> = (_data) => {
    alert(t('user.registrationError'));
  };

  return (
    <main className="mx-auto max-w-[900px] py-14">
      <SiteTitle>{t('navigation.registration')}</SiteTitle>
      <PageHeadline>{t('navigation.registration')}</PageHeadline>
      <form
        className="flex flex-col gap-3 lg:flex-row lg:gap-10"
        method="post"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 lg:w-1/2">
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
              <FormFieldError error={errors.firstName} />
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
              <FormFieldError error={errors.lastName} />
            </div>
          </div>
          <div>
            <label>
              <h4 className="mb-1">{t('user.nickname')}</h4>
              <TextInput
                type="text"
                className="w-full"
                {...register('nickname')}
              />
            </label>
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
            <FormFieldError error={errors.username} />
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
            <FormFieldError error={errors.email} />
          </div>
          <div>
            <PasswordCreateField
              errors={errors}
              register={register}
              watch={watch}
            />
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
            <FormFieldError error={errors.passwordConfirmation} />
          </div>
          <div>
            <label>
              <h5 className="mb-1">{t('user.gender')}</h5>
              <Select
                values={genderOptions}
                className="w-full"
                {...register('gender')}
              />
            </label>
            <FormFieldError error={errors.gender} />
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:w-1/2">
          <div>
            <DateOfBirthField errors={errors} register={register} />
          </div>
          <div>
            <PhoneNumberField
              errors={errors}
              register={register}
              getValues={getValues}
              setValue={setValue}
            />
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
            <FormFieldError error={errors.countryCode} />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <Checkbox {...register('consentNewsletter')} />
              <h4>{t('user.consentNewsletter')}</h4>
            </label>
            <FormFieldError error={errors.consentNewsletter} />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <Checkbox {...register('consentPrivacyPolicy')} />
              <h4>{t('user.consentPrivacyPolicy')}</h4>
            </label>
            <FormFieldError error={errors.consentPrivacyPolicy} />
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
            <FormFieldError error={errors.captcha} />
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
        </div>
      </form>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Registration;
