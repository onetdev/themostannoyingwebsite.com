'use client';

import {
  Button,
  CaptchaTitlePuzzleField,
  FormError,
  FormFieldError,
  LoaderDots,
  PageHeadline,
  TextInput,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FormProvider } from 'react-hook-form';

import { EmailField } from '../components/EmailField';
import { usePasswordReminderForm } from '../forms';

import { EMAIL_PATTERN, useNavigationViewModel } from '@/modules/shared';

export function PasswordReminderPage() {
  const t = useTranslations();
  const { LinkComponent: Link, pathFor } = useNavigationViewModel();
  const methods = usePasswordReminderForm({
    onSuccess: () => {},
  });
  const {
    handleSubmit,
    onSubmit,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const isCtaLoading = isSubmitting;
  const isCtaDisabled = isSubmitting;

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
        <FormError error={errors.root} />
        <div>
          <EmailField />
        </div>
        <CaptchaTitlePuzzleField text={captchaText} />

        <Button
          role="button"
          type="submit"
          className="mt-10"
          size="lg"
          disabled={isCtaDisabled}>
          {isCtaLoading && <LoaderDots />}
          {!isCtaLoading && t('user.form.passwordReminder.callToAction')}
        </Button>
        <div className="flex justify-between">
          <Link href={pathFor('user.login')} prefetch={false}>
            {t('user.common.Login')}
          </Link>
          <Link href={pathFor('user.signup')} prefetch={false}>
            {t('user.common.signup')}
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
