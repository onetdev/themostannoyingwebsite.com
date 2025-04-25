'use client';

import {
  Button,
  CaptchaTitlePuzzleField,
  FormFieldError,
  PageHeadline,
  TextInput,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import {
  FormProvider,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { usePasswordReminderForm } from '../forms';

import { Link } from '@/i18n/navigation';
import { EMAIL_PATTERN } from '@/utils/validator';

export function PasswordReminderPage() {
  const t = useTranslations();
  const methods = usePasswordReminderForm();
  const {
    handleSubmit,
    onSubmit,
    register,
    setValue,
    formState: { errors },
  } = methods;

  const captchaText = {
    label: t('form.captcha.field'),
    hint: t('form.captcha.captchaTilePuzzleHint'),
    invalid: t('form.validation.error.captchaInvalid'),
  };

  return (
    <FormProvider {...methods}>
      <PageHeadline>{t('navigation.passwordReminder')}</PageHeadline>
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
        <CaptchaTitlePuzzleField text={captchaText} />

        <Button type="submit" className="mt-10" size="lg">
          {t('user.form.passwordReminder.callToAction')}
        </Button>
        <div className="flex justify-between">
          <Link href="/user/login" passHref prefetch={false}>
            {t('user.common.Login')}
          </Link>
          <Link href="/user/registration" passHref prefetch={false}>
            {t('user.common.register')}
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
