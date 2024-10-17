import { NextPage } from 'next';
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

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => console.log(data);

  return (
    <main className="mx-auto max-w-[500px] py-14">
      <SiteTitle>{t('navigation.login')}</SiteTitle>
      <PageHeadline>{t('navigation.login')}</PageHeadline>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <h4>{t('userLogin.email')}</h4>
          <TextInput
            type="email"
            className="w-full"
            {...register('email', { required: true })}
          />
          <small>{errors.email?.message}</small>
        </label>
        <label>
          <h4>{t('userLogin.password')}</h4>
          <TextInput
            type="password"
            className="w-full"
            {...register('password', { required: true })}
          />
          <small>{errors.password?.message}</small>
        </label>
        <label className="flex items-center gap-2">
          <Checkbox {...register('remember')} />
          <h4>{t('userLogin.rememberMe')}</h4>
        </label>
        <label>
          <h4>{t('userLogin.captcha')}</h4>
          <small>{t('userLogin.captchaHint')}</small>
          <CaptchaEmoji
            className="my-3 rounded-md border border-on-background"
            width={300}
            height={100}
          />
          <TextInput
            type="text"
            className="w-[300px]"
            {...register('captcha', { required: true })}
          />
          <small>{errors.captcha?.message}</small>
        </label>

        <Button type="submit" className="mt-10">
          {t('actions.login')}
        </Button>
      </form>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Login;
