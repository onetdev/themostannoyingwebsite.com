'use client';

import { Button, FieldError, LoaderDots, PageHeadline } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FormProvider } from 'react-hook-form';
import { useNavigationProvider } from '@/core/navigation/react/NavigationContext';
import { CaptchaField } from '@/features/captcha/components';
import { useLoginForm } from '../../hooks';
import { EmailField, PasswordField, RememberMeField } from '../_fields';

export function LoginForm() {
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldError errors={[errors.root]} />
        <EmailField />
        <PasswordField />
        <RememberMeField />
        <CaptchaField />

        <Button
          role="button"
          type="submit"
          className="mt-10"
          size="lg"
          disabled={isCtaDisabled}
        >
          {isCtaLoading && <LoaderDots />}
          {!isCtaLoading && t('auth.form.login.callToAction')}
        </Button>
        <div className="flex justify-between">
          <Link href={pathFor('user.password-reminder')} prefetch={false}>
            {t('auth.common.forgotPassword')}
          </Link>
          <Link href={pathFor('user.signup')} prefetch={false}>
            {t('auth.common.lookingForSignup')}
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
