import type { Metadata } from 'next';
import { NOINDEX_ROBOTS } from '@/core/seo/robots';
import { AdminAuthPage } from '@/features/auth/components';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Admin',
    robots: NOINDEX_ROBOTS,
  };
}

export default function Page() {
  return <AdminAuthPage />;
}
