import { useTranslations } from 'next-intl';

import { PageLayout } from '@/components/PageLayout';

export const generateMetadata = () => {
  return {
    title: '404',
  };
};

export default function NotFoundPage() {
  const t = useTranslations();
  return (
    <PageLayout role="main">
      <h1>{t('messages.errors.e404title')}</h1>
      <h3>{t('messages.errors.e404description')}</h3>
    </PageLayout>
  );
}
