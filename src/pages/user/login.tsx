import { NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/atoms/Button';
import CaptchaEmoji from '@/components/atoms/CaptchaEmoji';
import Checkbox from '@/components/atoms/Checkbox';
import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import TextInput from '@/components/atoms/TextInput';
import { makeI18nStaticProps } from '@/utils/i18n';

type LoginFormInputs = {
  email: string;
  password: string;
  remember: boolean;
  captcha: string;
};

const Login: NextPage = () => {
  const { t } = useTranslation('common');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (_data) => {
    alert(t('userLogin.loginError'));
  };

  return (
    <main className="mx-auto max-w-[500px] py-14">
      <SiteTitle>{t('navigation.login')}</SiteTitle>
      <PageHeadline>{t('navigation.login')}</PageHeadline>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <h4 className="mb-1">{t('userLogin.email')}</h4>
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
        <div>
          <label>
            <h4 className="mb-1">{t('userLogin.password')}</h4>
            <TextInput
              type="password"
              className="w-full"
              {...register('password', {
                required: t('validation.errors.required'),
              })}
            />
          </label>
          {errors.password && (
            <small className="mt-1 block text-error">
              {errors.password?.message}
            </small>
          )}
        </div>
        <div>
          <label className="flex items-center gap-2">
            <Checkbox {...register('remember')} />
            <h4>{t('userLogin.rememberMe')}</h4>
          </label>
          {errors.remember && (
            <small className="mt-1 block text-error">
              {errors.remember?.message}
            </small>
          )}
        </div>
        <div className="flex flex-col">
          <label>
            <h4 className="mb-1">{t('userLogin.captcha')}</h4>
            <small>{t('userLogin.captchaHint')}</small>
            <CaptchaEmoji
              className="my-3 rounded-md border border-on-background"
              width={300}
              height={100}
            />
            <TextInput
              type="text"
              className="w-[300px]"
              {...register('captcha', {
                required: t('validation.errors.required'),
                pattern: {
                  value: /^[XyZ123]{444}$/,
                  message: t('validation.errors.captchaInvalid'),
                },
              })}
            />
          </label>
          {errors.captcha && (
            <small className="mt-1 block text-error">
              {errors.captcha?.message}
            </small>
          )}
        </div>

        <Button type="submit" className="mt-10" size="lg">
          {t('actions.login')}
        </Button>
        <div className="flex justify-between">
          <Link href="/user/password-reminder">
            {t('userLogin.forgotPassword')}
          </Link>
          <Link href="/user/registration">{t('userLogin.registration')}</Link>
        </div>
      </form>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Login;
