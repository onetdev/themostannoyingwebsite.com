import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageLayout } from '@/components/PageLayout';
import { PasswordReminderPage } from '@/modules/auth';

export { generateStaticParams } from '@/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.userPasswordReminder',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Page() {
  return (
    <PageLayout
      activeItem="login"
      className="mx-auto max-w-md py-0 md:py-14"
      role="main">
      <PasswordReminderPage />
    </PageLayout>
  );
}
