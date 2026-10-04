import type { Metadata } from 'next';
import { NOINDEX_ROBOTS } from '@/core/seo/robots';
import { DebugPage } from '@/features/monitoring/components';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Debugger',
    robots: NOINDEX_ROBOTS,
  };
}

export default function Page() {
  return <DebugPage />;
}
