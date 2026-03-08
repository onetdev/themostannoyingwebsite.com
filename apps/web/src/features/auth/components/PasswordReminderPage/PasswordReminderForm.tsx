'use client';

import { Button, FieldError, LoaderDots, PageHeadline } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FormProvider } from 'react-hook-form';
import { CaptchaField } from '@/features/captcha/components';
import { useNavigationProvider } from '@/navigation/NavigationContext';
import { usePasswordReminderForm } from '../../hooks';
import { EmailField } from '../_fields';

export function PasswordReminderForm() {
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

  return (
    <FormProvider {...methods}>
      <PageHeadline>{t('navigation.passwordReminder')}</PageHeadline>
      <form
        className="flex flex-col gap-5"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldError errors={[errors.root]} />
        <EmailField />
        <CaptchaField />

        <Button
          role="button"
          type="submit"
          className="mt-10"
          size="lg"
          disabled={isCtaDisabled}
        >
          {isCtaLoading && <LoaderDots />}
          {!isCtaLoading && t('auth.form.passwordReminder.callToAction')}
        </Button>
        <div className="flex justify-between">
          <Link href={pathFor('user.login')} prefetch={false}>
            {t('auth.common.login')}
          </Link>
          <Link href={pathFor('user.signup')} prefetch={false}>
            {t('auth.common.signup')}
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
