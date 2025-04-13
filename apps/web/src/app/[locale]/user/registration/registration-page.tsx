'use client';

import { Link } from '@/i18n/navigation';
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';

import {
  Button,
  Checkbox,
  FormFieldError,
  TextInput,
  CaptchaEmojiField,
  PageHeadline,
} from '@maw/ui';
import {
  CountryField,
  DateOfBirthField,
  GenderField,
  PasswordCreateField,
  PhoneNumberField,
  RegistrationFormInputs,
} from '@/features/auth';
import { EMAIL_PATTERN } from '@/lib/utils/validator';
import { useTranslations } from 'next-intl';

export function RegistrationPage() {
  const t = useTranslations();
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
    alert(t('user.form.registration.genericError'));
  };

  const captchaText = {
    label: t('form.captcha.field'),
    hint: t('form.captcha.captchaEmojiHint'),
    required: t('form.validation.error.required'),
    invalid: t('form.validation.error.captchaInvalid'),
  };

  return (
    <main className="mx-auto max-w-[900px] py-0 md:py-14" role="main">
      <PageHeadline>{t('navigation.register')}</PageHeadline>
      <form
        className="flex flex-col gap-3 lg:flex-row lg:gap-10"
        method="post"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 lg:w-1/2">
          <div className="flex flex-row gap-5">
            <div className="grow">
              <label>
                <h4 className="mb-1">{t('user.field.firstName')}</h4>
                <TextInput
                  type="text"
                  className="w-full"
                  {...register('firstName', {
                    required: t('form.validation.error.required'),
                  })}
                />
              </label>
              <FormFieldError error={errors.firstName} />
            </div>
            <div className="grow">
              <label>
                <h4 className="mb-1">{t('user.field.lastName')}</h4>
                <TextInput
                  type="text"
                  className="w-full"
                  {...register('lastName', {
                    required: t('form.validation.error.required'),
                  })}
                />
              </label>
              <FormFieldError error={errors.lastName} />
            </div>
          </div>
          <div>
            <label>
              <h4 className="mb-1">{t('user.field.nickname')}</h4>
              <TextInput
                type="text"
                className="w-full"
                {...register('nickname')}
              />
            </label>
          </div>
          <div>
            <label>
              <h4 className="mb-1">{t('user.field.username')}</h4>
              <TextInput
                type="text"
                className="w-full"
                {...register('username', {
                  required: t('form.validation.error.required'),
                })}
              />
            </label>
            <FormFieldError error={errors.username} />
          </div>
          <div>
            <label>
              <h4 className="mb-1">{t('user.field.email')}</h4>
              <TextInput
                type="email"
                className="w-full"
                {...register('email', {
                  required: t('form.validation.error.required'),
                  pattern: {
                    value: EMAIL_PATTERN,
                    message: t('form.validation.error.emailInvalid'),
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
              <h5 className="mb-1">{t('user.field.passwordConfirmation')}</h5>
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
              <h4>{t('user.field.consentNewsletter')}</h4>
            </label>
            <FormFieldError error={errors.consentNewsletter} />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <Checkbox {...register('consentPrivacyPolicy')} />
              <h4>{t('user.field.consentPrivacyPolicy')}</h4>
            </label>
            <FormFieldError error={errors.consentPrivacyPolicy} />
          </div>
          <CaptchaEmojiField
            errors={errors}
            register={register as unknown as UseFormRegister<CaptchaFormInputs>}
            text={captchaText}
          />

          <Button type="submit" className="mt-10" size="lg">
            {t('user.form.registration.callToAction')}
          </Button>
          <div className="flex justify-between">
            <Link href="/user/password-reminder" passHref prefetch={false}>
              {t('user.common.forgotPassword')}
            </Link>
            <Link href="/user/login" passHref prefetch={false}>
              {t('user.common.Login')}
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
