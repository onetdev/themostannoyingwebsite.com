'use client';

import {
  Button,
  CaptchaEmojiField,
  Checkbox,
  FormError,
  FormFieldError,
  LabelText,
  LoaderDots,
  PageHeadline,
  TextInput,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FormProvider } from 'react-hook-form';

import {
  CountryField,
  DateOfBirthField,
  GenderField,
  PasswordCreateField,
  PhoneNumberField,
} from '../components';
import { EmailField } from '../components/EmailField';
import { useSignupForm } from '../forms';

import { useNavigationViewModel } from '@/modules/shared';

export function SignupPage() {
  const t = useTranslations();
  const { LinkComponent: Link, pathFor } = useNavigationViewModel();
  const { navigateReplace } = useNavigationViewModel();
  const methods = useSignupForm({
    onSuccess: () => navigateReplace('user.profile'),
  });
  const {
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    onSubmit,
    register,
  } = methods;

  const isCtaLoading = isSubmitting;
  const isCtaDisabled = isSubmitting;

  const captchaText = {
    label: t('form.captcha.field'),
    hint: t('form.captcha.captchaEmojiHint'),
    required: t('form.validation.error.required'),
    invalid: t('form.validation.error.captchaInvalid'),
  };

  return (
    <FormProvider {...methods}>
      <PageHeadline>{t('navigation.signup')}</PageHeadline>
      <form
        className="flex flex-col gap-3 lg:flex-row lg:gap-10"
        method="post"
        onSubmit={handleSubmit(onSubmit)}>
        <FormError error={errors.root} />
        <div className="flex flex-col gap-5 lg:w-1/2">
          <div className="flex flex-row gap-5">
            <div className="grow">
              <label>
                <LabelText className="mb-1">
                  {t('user.field.firstName')}
                </LabelText>
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
                <LabelText className="mb-1">
                  {t('user.field.lastName')}
                </LabelText>
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
              <LabelText className="mb-1">{t('user.field.nickname')}</LabelText>
              <TextInput
                type="text"
                className="w-full"
                {...register('nickname')}
              />
            </label>
          </div>
          <div>
            <label>
              <span className="mb-1 text-lg font-medium">
                {t('user.field.username')}
              </span>
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
            <EmailField />
          </div>
          <div>
            <PasswordCreateField />
          </div>
          <div>
            <label>
              <LabelText className="mb-1">
                {t('user.field.passwordConfirmation')}
              </LabelText>
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
          <GenderField />
        </div>
        <div className="flex flex-col gap-5 lg:w-1/2">
          <DateOfBirthField />
          <PhoneNumberField />
          <CountryField />
          <div>
            <label className="flex items-center gap-2">
              <Checkbox {...register('consentNewsletter')} />
              <h4>{t('user.field.consentNewsletter')}</h4>
            </label>
            <FormFieldError error={errors.consentNewsletter} />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <Checkbox {...register('consentPrivacyPolicy')} required />
              <h4>{t('user.field.consentPrivacyPolicy')}</h4>
            </label>
            <FormFieldError error={errors.consentPrivacyPolicy} />
          </div>
          <CaptchaEmojiField text={captchaText} />

          <Button
            role="button"
            type="submit"
            className="mt-10"
            size="lg"
            disabled={isCtaDisabled}>
            {isCtaLoading && <LoaderDots />}
            {!isCtaLoading && t('user.form.signup.callToAction')}
          </Button>
          <div className="flex justify-between">
            <Link href={pathFor('user.password-reminder')} prefetch={false}>
              {t('user.common.forgotPassword')}
            </Link>
            <Link href={pathFor('user.login')} prefetch={false}>
              {t('user.common.Login')}
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
