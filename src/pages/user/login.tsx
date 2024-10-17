import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import Button from '@/components/atoms/Button';
import CaptchaEmoji from '@/components/atoms/CaptchaEmoji';
import Checkbox from '@/components/atoms/Checkbox';
import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import TextInput from '@/components/atoms/TextInput';
import { makeI18nStaticProps } from '@/utils/i18n';

const Login: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <main>
      <SiteTitle>{t('navigation.login')}</SiteTitle>
      <PageHeadline>{t('navigation.login')}</PageHeadline>
      <form className="flex flex-col gap-5">
        <label>
          <h4>{t('userLogin.email')}</h4>
          <TextInput type="email" name="email" />
        </label>
        <label>
          <h4>{t('userLogin.password')}</h4>
          <TextInput type="password" name="password" />
        </label>
        <label className="flex items-center gap-2">
          <Checkbox name="remember" />
          <h4>{t('userLogin.rememberMe')}</h4>
        </label>
        <label>
          <h4>{t('userLogin.captcha')}</h4>
          <CaptchaEmoji className="border border-on-background" />
          <p>{t('userLogin.captchaHint')}</p>
          <TextInput type="text" name="captcha" />
        </label>

        <Button type="submit">{t('actions.login')}</Button>
      </form>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Login;
