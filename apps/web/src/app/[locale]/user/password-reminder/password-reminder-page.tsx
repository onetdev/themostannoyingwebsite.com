'use client';

import {
  Button,
  CaptchaTitlePuzzleField,
  FormFieldError,
  PageHeadline,
  TextInput,
} from '@maw/ui';
import { useTranslations } from 'next-intl';
import {
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { PasswordReminderFormInputs } from '@/features/auth';
import { Link } from '@/i18n/navigation';
import { EMAIL_PATTERN } from '@/utils/validator';

export function PasswordReminderPage() {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PasswordReminderFormInputs>();

  const onSubmit: SubmitHandler<PasswordReminderFormInputs> = (_data) => {
    alert(t('user.form.passwordReminder.genericError'));
  };

  const captchaText = {
    label: t('form.captcha.field'),
    hint: t('form.captcha.captchaTilePuzzleHint'),
    invalid: t('form.validation.error.captchaInvalid'),
  };

  return (
    <main className="mx-auto max-w-md py-0 md:py-14" role="main">
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
        <CaptchaTitlePuzzleField
          errors={errors}
          register={register as unknown as UseFormRegister<CaptchaFormInputs>}
          setValue={setValue as unknown as UseFormSetValue<CaptchaFormInputs>}
          text={captchaText}
        />

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
    </main>
  );
}
