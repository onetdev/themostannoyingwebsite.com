import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { NOINDEX_ROBOTS } from '@/core/seo/robots';
import { SignupPage } from '@/features/auth/components';
import { NarrowPageLayout } from '../../_components/NarrowPageLayout';

export { generateStaticParams } from '@/core/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.userSignup',
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
      route="user.signup"
      navigationHighlightRoute="user.login"
      maxWidthClassName="max-w-[900px]"
      role="main"
    >
      <SignupPage />
    </NarrowPageLayout>
  );
}
