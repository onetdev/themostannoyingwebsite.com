'use client';

import { Button, FieldError, LoaderDots, PageHeadline } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FormProvider } from 'react-hook-form';
import { CaptchaField } from '@/features/captcha/components';
import { useNavigationProvider } from '@/navigation/NavigationContext';
import { useSignupForm } from '../../hooks';
import {
  ConsentChildSoulField,
  ConsentNewsletterField,
  ConsentPrivacyPolicyField,
  ConsentTermsOfUseField,
  CountryField,
  DateOfBirthField,
  EmailField,
  FirstNameField,
  GenderField,
  LastNameField,
  NicknameField,
  PasswordConfirmationField,
  PasswordCreateField,
  PhoneNumberField,
  UsernameField,
} from '../_fields';

export function SignupForm() {
  const t = useTranslations();
  const { LinkComponent: Link, pathFor } = useNavigationProvider();
  const { navigateReplace } = useNavigationProvider();
  const methods = useSignupForm({
    onSuccess: () => navigateReplace('user.profile'),
  });
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    onSubmit,
  } = methods;

  const isCtaLoading = isSubmitting;
  const isCtaDisabled = isSubmitting;

  return (
    <FormProvider {...methods}>
      <PageHeadline>{t('navigation.signup')}</PageHeadline>
      <form
        className="flex flex-col gap-3 lg:flex-row lg:gap-10"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldError errors={[errors.root]} />
        <div className="flex flex-col gap-4 lg:w-1/2">
          <div className="flex flex-row gap-5">
            <div className="grow">
              <FirstNameField required />
            </div>
            <div className="grow">
              <LastNameField required />
            </div>
          </div>
          <NicknameField />
          <UsernameField required />
          <EmailField required />
          <PasswordCreateField required />
          <PasswordConfirmationField required />
          <DateOfBirthField />
          <GenderField />
        </div>
        <div className="flex flex-col gap-5 lg:w-1/2">
          <PhoneNumberField />
          <CountryField required />
          <ConsentNewsletterField />
          <ConsentPrivacyPolicyField required />
          <ConsentTermsOfUseField required />
          <ConsentChildSoulField required />
          <CaptchaField />

          <Button
            role="button"
            type="submit"
            className="mt-10"
            size="lg"
            disabled={isCtaDisabled}
          >
            {isCtaLoading && <LoaderDots />}
            {!isCtaLoading && t('auth.form.signup.callToAction')}
          </Button>
          <div className="flex justify-between">
            <Link href={pathFor('user.password-reminder')} prefetch={false}>
              {t('auth.common.forgotPassword')}
            </Link>
            <Link href={pathFor('user.login')} prefetch={false}>
              {t('auth.common.login')}
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
