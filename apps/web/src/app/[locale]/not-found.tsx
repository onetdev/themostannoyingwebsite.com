import { useTranslations } from 'next-intl';

export const generateMetadata = () => {
  return {
    title: '404',
  };
};

export default function NotFoundPage() {
  const t = useTranslations();
  return (
    <>
      <h1>{t('messages.errors.e404title')}</h1>
      <h3>{t('messages.errors.e404description')}</h3>
    </>
  );
}
