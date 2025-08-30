'use client';

import {
  Button,
  CaptchaTitlePuzzleField,
  FormError,
  LoaderDots,
  PageHeadline,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FormProvider } from 'react-hook-form';

import { usePasswordReminderForm } from '../../application/forms';
import { EmailField } from '../components/EmailField';

import { useNavigationProvider } from '@/modules/kernel';

export function PasswordReminderPage() {
  const t = useTranslations();
  const { LinkComponent: Link, pathFor } = useNavigationProvider();
  const methods = usePasswordReminderForm({
    onSuccess: () => {},
  });
  const {
    handleSubmit,
    onSubmit,
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
