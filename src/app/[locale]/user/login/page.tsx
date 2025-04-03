import { getTranslations } from 'next-intl/server';
import { LoginPage } from './login-page';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('navigation.login'),
  };
}

export default async function Page() {
  return (
    <LoginPage />
  );
};
