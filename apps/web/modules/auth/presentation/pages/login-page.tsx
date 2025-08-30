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

import { useLoginForm } from '../../application/forms/useLoginForm';
import { EmailField } from '../components/EmailField';

import { useNavigationProvider } from '@/modules/kernel';

export function LoginPage() {
  const t = useTranslations();
  const {
    LinkComponent: Link,
    navigateReplace,
    pathFor,
  } = useNavigationProvider();
  const form = useLoginForm({
    onSuccess: () => navigateReplace('user.profile'),
  });
  const {
    handleSubmit,
    onSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const isCtaLoading = isSubmitting;
  const isCtaDisabled = isSubmitting;

  const captchaFieldText = {
    label: t('form.captcha.field'),
    hint: t('form.captcha.captchaEmojiHint'),
    required: t('form.validation.error.required'),
    invalid: t('form.validation.error.captchaInvalid'),
  };

  return (
    <FormProvider {...form}>
      <PageHeadline>{t('navigation.login')}</PageHeadline>
      <form
        className="flex flex-col gap-5"
        method="post"
        onSubmit={handleSubmit(onSubmit)}>
        <FormError error={errors.root} />
        <div>
          <EmailField />
        </div>
        <div>
          <label>
            <LabelText className="mb-1">{t('user.field.password')}</LabelText>
            <TextInput
              type="password"
              className="w-full"
              {...register('password', {
                required: t('form.validation.error.required'),
              })}
            />
          </label>
          <FormFieldError error={errors.password} />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <Checkbox {...register('remember')} />
            <h4>{t('user.field.rememberMe')}</h4>
          </label>
          <FormFieldError error={errors.remember} />
        </div>
        <div className="flex flex-col">
          <CaptchaEmojiField text={captchaFieldText} />
        </div>

        <Button
          role="button"
          type="submit"
          className="mt-10"
          size="lg"
          variant="primary"
          disabled={isCtaDisabled}>
          {isCtaLoading && <LoaderDots />}
          {!isCtaLoading && t('user.form.login.callToAction')}
        </Button>
        <div className="flex justify-between">
          <Link href={pathFor('user.password-reminder')} prefetch={false}>
            {t('user.common.forgotPassword')}
          </Link>
          <Link href={pathFor('user.signup')} prefetch={false}>
            {t('user.common.lookingForSignup')}
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
