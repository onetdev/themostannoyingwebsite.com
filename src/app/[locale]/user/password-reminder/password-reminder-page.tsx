'use client';

import { Link } from '@/i18n/navigation';
import {
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import Button from '@/components/atoms/Button';
import FormFieldError from '@/components/atoms/FormFieldError';
import PageHeadline from '@/components/atoms/PageHeadline';
import TextInput from '@/components/atoms/TextInput';
import CaptchaTitlePuzzleField from '@/components/molecules/CaptchaTitlePuzzleFied';
import { PasswordReminderFormInputs } from '@/features/auth';
import { EMAIL_PATTERN } from '@/lib/utils/validator';
import { useTranslations } from 'next-intl';

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

  return (
    <main className="mx-auto max-w-md py-0 md:py-14">
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
};
