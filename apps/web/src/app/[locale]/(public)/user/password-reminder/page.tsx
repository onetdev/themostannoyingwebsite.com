import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { NOINDEX_ROBOTS } from '@/core/seo/robots';
import { PasswordReminderPage } from '@/features/auth/components';
import { NarrowPageLayout } from '../../_components/NarrowPageLayout';

export { generateStaticParams } from '@/core/i18n/routing';

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
    robots: NOINDEX_ROBOTS,
  };
}

export default function Page() {
  return (
    <NarrowPageLayout
      route="user.password-reminder"
      navigationHighlightRoute="user.login"
      role="main"
    >
      <PasswordReminderPage />
    </NarrowPageLayout>
  );
}
