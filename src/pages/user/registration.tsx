import { NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';

import Button from '@/components/atoms/Button';
import Checkbox from '@/components/atoms/Checkbox';
import FormFieldError from '@/components/atoms/FormFieldError';
import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import TextInput from '@/components/atoms/TextInput';
import CaptchaEmojiField from '@/components/molecules/CaptchaEmojiField';
import {
  CountryField,
  DateOfBirthField,
  GenderField,
  PasswordCreateField,
  PhoneNumberField,
  RegistrationFormInputs,
} from '@/features/auth';
import { makeI18nStaticProps } from '@/utils/i18n';
import { EMAIL_PATTERN } from '@/utils/validator';

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

  const onSubmit: SubmitHandler<RegistrationFormInputs> = (_data) => {
    alert(t('auth.forms.registration.genericError'));
  };

  return (
    <main className="mx-auto max-w-[900px] py-0 md:py-14">
      <SiteTitle>{t('navigation.register')}</SiteTitle>
      <PageHeadline>{t('navigation.register')}</PageHeadline>
      <form
        className="flex flex-col gap-3 lg:flex-row lg:gap-10"
        method="post"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 lg:w-1/2">
          <div className="flex flex-row gap-5">
            <div className="grow">
              <label>
                <h4 className="mb-1">{t('auth.field.firstName')}</h4>
                <TextInput
                  type="text"
                  className="w-full"
                  {...register('firstName', {
                    required: t('form.validation.errors.required'),
                  })}
                />
              </label>
              <FormFieldError error={errors.firstName} />
            </div>
            <div className="grow">
              <label>
                <h4 className="mb-1">{t('auth.field.lastName')}</h4>
                <TextInput
                  type="text"
                  className="w-full"
                  {...register('lastName', {
                    required: t('form.validation.errors.required'),
                  })}
                />
              </label>
              <FormFieldError error={errors.lastName} />
            </div>
          </div>
          <div>
            <label>
              <h4 className="mb-1">{t('auth.field.nickname')}</h4>
              <TextInput
                type="text"
                className="w-full"
                {...register('nickname')}
              />
            </label>
          </div>
          <div>
            <label>
              <h4 className="mb-1">{t('auth.field.username')}</h4>
              <TextInput
                type="text"
                className="w-full"
                {...register('username', {
                  required: t('form.validation.errors.required'),
                })}
              />
            </label>
            <FormFieldError error={errors.username} />
          </div>
          <div>
            <label>
              <h4 className="mb-1">{t('auth.field.email')}</h4>
              <TextInput
                type="email"
                className="w-full"
                {...register('email', {
                  required: t('form.validation.errors.required'),
                  pattern: {
                    value: EMAIL_PATTERN,
                    message: t('form.validation.errors.emailInvalid'),
                  },
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
              <h5 className="mb-1">{t('auth.field.passwordConfirmation')}</h5>
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
          <GenderField errors={errors} register={register} />
        </div>
        <div className="flex flex-col gap-5 lg:w-1/2">
          <DateOfBirthField
            errors={errors}
            register={register}
            setValue={setValue}
          />
          <PhoneNumberField
            errors={errors}
            register={register}
            getValues={getValues}
            setValue={setValue}
          />
          <CountryField errors={errors} register={register} />
          <div>
            <label className="flex items-center gap-2">
              <Checkbox {...register('consentNewsletter')} />
              <h4>{t('auth.field.consentNewsletter')}</h4>
            </label>
            <FormFieldError error={errors.consentNewsletter} />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <Checkbox {...register('consentPrivacyPolicy')} />
              <h4>{t('auth.field.consentPrivacyPolicy')}</h4>
            </label>
            <FormFieldError error={errors.consentPrivacyPolicy} />
          </div>
          <CaptchaEmojiField
            errors={errors}
            register={register as unknown as UseFormRegister<CaptchaFormInputs>}
          />

          <Button type="submit" className="mt-10" size="lg">
            {t('auth.forms.registration.callToAction')}
          </Button>
          <div className="flex justify-between">
            <Link href="/user/password-reminder" passHref prefetch={false}>
              {t('auth.common.forgotPassword')}
            </Link>
            <Link href="/user/login" passHref prefetch={false}>
              {t('auth.common.Login')}
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Registration;
