import { NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import {
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import Button from '@/components/atoms/Button';
import FormFieldError from '@/components/atoms/FormFieldError';
import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import TextInput from '@/components/atoms/TextInput';
import CaptchaTitlePuzzleField from '@/components/molecules/CaptchaTitlePuzzleFied';
import { PasswordReminderFormInputs } from '@/features/auth';
import { makeI18nStaticProps } from '@/utils/i18n';
import { EMAIL_PATTERN } from '@/utils/validator';

const PasswordReminder: NextPage = () => {
  const { t } = useTranslation('common');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PasswordReminderFormInputs>();

  const onSubmit: SubmitHandler<PasswordReminderFormInputs> = (_data) => {
    alert(t('user.passwordReminderError'));
  };

  return (
    <main className="mx-auto max-w-[500px] py-14">
      <SiteTitle>{t('navigation.passwordReminder')}</SiteTitle>
      <PageHeadline>{t('navigation.passwordReminder')}</PageHeadline>
      <form
        className="flex flex-col gap-5"
        method="post"
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <h4 className="mb-1">{t('user.email')}</h4>
            <TextInput
              type="email"
              className="w-full"
              {...register('email', {
                required: t('validation.errors.required'),
                pattern: {
                  value: EMAIL_PATTERN,
                  message: t('validation.errors.emailInvalid'),
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
          {t('user.sendPasswordReminder')}
        </Button>
        <div className="flex justify-between">
          <Link href="/user/login" passHref prefetch={false}>
            {t('navigation.login')}
          </Link>
          <Link href="/user/registration" passHref prefetch={false}>
            {t('user.registerAccount')}
          </Link>
        </div>
      </form>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default PasswordReminder;
