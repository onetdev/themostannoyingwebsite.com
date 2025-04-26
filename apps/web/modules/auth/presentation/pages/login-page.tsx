'use client';

import {
  Button,
  CaptchaEmoji,
  Checkbox,
  FormFieldError,
  LoaderDots,
  PageHeadline,
  TextInput,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FormProvider } from 'react-hook-form';

import { EmailField } from '../components/EmailField';
import { useLoginForm } from '../forms/useLoginForm';

import { useNavigationViewModel } from '@/modules/shared';

export function LoginPage() {
  const t = useTranslations();
  const {
    LinkComponent: Link,
    navigateReplace,
    pathFor,
  } = useNavigationViewModel();
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

  return (
    <FormProvider {...form}>
      <PageHeadline>{t('navigation.login')}</PageHeadline>
      <form
        className="flex flex-col gap-5"
        method="post"
        onSubmit={handleSubmit(onSubmit)}>
        {errors.root?.message}
        <div>
          <EmailField />
        </div>
        <div>
          <label>
            <h4 className="mb-1">{t('user.field.password')}</h4>
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
          <label>
            <h4 className="mb-1">{t('form.captcha.field')}</h4>
            <small>{t('form.captcha.captchaEmojiHint')}</small>
            <CaptchaEmoji
              className="border-on-background my-3 rounded-md border"
              width={300}
              height={100}
            />
            <TextInput
              type="text"
              className="w-[300px]"
              {...register('captcha', {
                required: t('form.validation.error.required'),
                pattern: {
                  value: /^[XyZ123]{444}$/,
                  message: t('form.validation.error.captchaInvalid'),
                },
              })}
            />
          </label>
          <FormFieldError error={errors.captcha} />
        </div>

        <Button
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
            {t('user.common.registerAccount')}
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
