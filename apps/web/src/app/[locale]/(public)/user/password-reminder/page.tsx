import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageLayout } from '@/app/_components/PageLayout';
import { PasswordReminderPage } from '@/features/auth/components';

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
      autoPadding={false}
      activeItem="login"
      className="mx-auto max-w-md p-0 px-5 md:py-14"
      role="main">
      <PasswordReminderPage />
    </PageLayout>
  );
}
