import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { NOINDEX_ROBOTS } from '@/core/seo/robots';
import { MyProfilePage } from '@/features/user/components';
import { NarrowPageLayout } from '../../_components/NarrowPageLayout';

export { generateStaticParams } from '@/core/i18n/routing';

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.userProfile',
  });

  return {
    title: t('title'),
    description: t('description'),
    robots: NOINDEX_ROBOTS,
  };
}

export default async function Page() {
  return (
    <NarrowPageLayout
      route="user.profile"
      navigationHighlightRoute="user.login"
      maxWidthClassName="max-w-md"
      role="main"
    >
      <MyProfilePage />
    </NarrowPageLayout>
  );
}
