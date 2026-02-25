'use client';

import {
  Button,
  CaptchaEmojiField,
  Checkbox,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FormError,
  Input,
  LoaderDots,
  PageHeadline,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FormProvider } from 'react-hook-form';

import { useLoginForm } from '../../hooks/useLoginForm';
import { EmailField } from '../fields/EmailField';

import { useNavigationProvider } from '@/contexts/NavigationContext';

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
        <EmailField />
        <Field>
          <FieldLabel htmlFor="password">{t('user.field.password')}</FieldLabel>
          <FieldContent>
            <Input
              id="password"
              type="password"
              className="w-full"
              {...register('password')}
            />
            <FieldError errors={[errors.password]} />
          </FieldContent>
        </Field>
        <Field orientation="horizontal" className="items-center gap-2">
          <Checkbox id="remember" {...register('remember')} />
          <FieldLabel htmlFor="remember" className="font-normal">
            {t('user.field.rememberMe')}
          </FieldLabel>
          <FieldError errors={[errors.remember]} />
        </Field>
        <CaptchaEmojiField text={captchaFieldText} />

        <Button
          role="button"
          type="submit"
          className="mt-10"
          size="lg"
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
