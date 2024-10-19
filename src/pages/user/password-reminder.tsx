import { NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/atoms/Button';
import CaptchaTilePuzzle from '@/components/atoms/CaptchaTilePuzzle';
import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import TextInput from '@/components/atoms/TextInput';
import { makeI18nStaticProps } from '@/utils/i18n';

type PasswordReminderFormInputs = {
  email: string;
  captcha: string;
};

const PasswordReminder: NextPage = () => {
  const { t } = useTranslation('common');
  const [isCaptchaValid, setCaptchaValid] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordReminderFormInputs>();

  const onSubmit: SubmitHandler<PasswordReminderFormInputs> = (_data) => {
    alert(t('user.loginError'));
  };

  return (
    <main className="mx-auto max-w-[500px] py-14">
      <SiteTitle>{t('navigation.passwordReminder')}</SiteTitle>
      <PageHeadline>{t('navigation.passwordReminder')}</PageHeadline>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <h4 className="mb-1">{t('user.email')}</h4>
            <TextInput
              type="email"
              className="w-full"
              {...register('email', {
                required: t('validation.errors.required'),
              })}
            />
          </label>
          {errors.email && (
            <small className="mt-1 block text-error">
              {errors.email?.message}
            </small>
          )}
        </div>
        <div className="flex flex-col">
          <h4 className="mb-1">{t('captcha.field')}</h4>
          <small>{t('captcha.captchaTilePuzzleHint')}</small>
          <CaptchaTilePuzzle
            className="my-3 rounded-md border border-on-background"
            cols={9}
            rows={3}
            imageSrc="/assets/images/captcha-tile-abstract.jpg"
            onResolved={() => setCaptchaValid(true)}
          />
          <TextInput
            type="hidden"
            value={isCaptchaValid ? 'true' : ''}
            {...register('captcha', {
              required: t('validation.errors.captchaInvalid'),
            })}
          />
          {errors.captcha && (
            <small className="mt-1 block text-error">
              {errors.captcha?.message}
            </small>
          )}
        </div>

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
