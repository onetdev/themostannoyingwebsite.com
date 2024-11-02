import { NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/atoms/Button';
import CaptchaEmoji from '@/components/atoms/CaptchaEmoji';
import Checkbox from '@/components/atoms/Checkbox';
import FormFieldError from '@/components/atoms/FormFieldError';
import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import TextInput from '@/components/atoms/TextInput';
import { LoginFormInputs } from '@/features/auth';
import { makeI18nStaticProps } from '@/utils/i18n';
import { EMAIL_PATTERN } from '@/utils/validator';

const Login: NextPage = () => {
  const { t } = useTranslation('common');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (_data) => {
    alert(t('auth.forms.login.genericError'));
  };

  return (
    <main className="mx-auto max-w-md py-0 md:py-14">
      <SiteTitle>{t('navigation.login')}</SiteTitle>
      <PageHeadline>{t('navigation.login')}</PageHeadline>
      <form
        className="flex flex-col gap-5"
        method="post"
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <h4 className="mb-1">{t('auth.field.email')}</h4>
            <TextInput
              type="email"
              className="w-full"
              {...register('email', {
                required: t('form.validation.errors.required'),
                pattern: {
                  value: EMAIL_PATTERN,
                  message: t('form.validation.errors.emailInvalid'),
                },
              })}
            />
          </label>
          <FormFieldError error={errors.email} />
        </div>
        <div>
          <label>
            <h4 className="mb-1">{t('auth.field.password')}</h4>
            <TextInput
              type="password"
              className="w-full"
              {...register('password', {
                required: t('form.validation.errors.required'),
              })}
            />
          </label>
          <FormFieldError error={errors.password} />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <Checkbox {...register('remember')} />
            <h4>{t('auth.field.rememberMe')}</h4>
          </label>
          <FormFieldError error={errors.remember} />
        </div>
        <div className="flex flex-col">
          <label>
            <h4 className="mb-1">{t('form.captcha.field')}</h4>
            <small>{t('form.captcha.captchaEmojiHint')}</small>
            <CaptchaEmoji
              className="my-3 rounded-md border border-on-background"
              width={300}
              height={100}
            />
            <TextInput
              type="text"
              className="w-[300px]"
              {...register('captcha', {
                required: t('form.validation.errors.required'),
                pattern: {
                  value: /^[XyZ123]{444}$/,
                  message: t('form.validation.errors.captchaInvalid'),
                },
              })}
            />
          </label>
          <FormFieldError error={errors.captcha} />
        </div>

        <Button type="submit" className="mt-10" size="lg">
          {t('auth.forms.login.callToAction')}
        </Button>
        <div className="flex justify-between">
          <Link href="/user/password-reminder" passHref prefetch={false}>
            {t('auth.common.forgotPassword')}
          </Link>
          <Link href="/user/registration" passHref prefetch={false}>
            {t('auth.common.registerAccount')}
          </Link>
        </div>
      </form>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Login;
