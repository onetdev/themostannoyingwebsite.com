'use client';

import {
  Button,
  CaptchaEmoji,
  Checkbox,
  FormFieldError,
  PageHeadline,
  TextInput,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';

import { LoginFormInputs } from '@/features/auth';
import { Link } from '@/i18n/navigation';
import { EMAIL_PATTERN } from '@/utils/validator';

export function LoginPage() {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (_data) => {
    alert(t('user.form.login.genericError'));
  };

  return (
    <>
      <PageHeadline>{t('navigation.login')}</PageHeadline>
      <form
        className="flex flex-col gap-5"
        method="post"
        onSubmit={handleSubmit(onSubmit)}>
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

        <Button type="submit" className="mt-10" size="lg">
          {t('user.form.login.callToAction')}
        </Button>
        <div className="flex justify-between">
          <Link href="/user/password-reminder" passHref prefetch={false}>
            {t('user.common.forgotPassword')}
          </Link>
          <Link href="/user/registration" passHref prefetch={false}>
            {t('user.common.registerAccount')}
          </Link>
        </div>
      </form>
    </>
  );
}
