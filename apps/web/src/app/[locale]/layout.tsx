import { Metadata, Viewport } from 'next';
import { getTranslations } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import { getAppConfigService } from '@/services';

const config = getAppConfigService().getAll();

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.app');

  return {
    robots: {
      index: true,
      follow: true,
    },
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    description: t('description'),
    metadataBase: new URL(config.deploymentMeta.publicUrl),
    openGraph: {
      siteName: t('title'),
      type: 'website',
      images: [
        {
          url: '/assets/social.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    icons: {
      icon: [
        { url: '/manifest/favicon-16x16.png', sizes: '16x16' },
        { url: '/manifest/favicon-32x32.png', sizes: '32x32' },
        { url: '/manifest/favicon-48x48.png', sizes: '48x48' },
      ],
      apple: [
        { url: '/manifest/apple-touch-icon-57x57.png', sizes: '57x57' },
        { url: '/manifest/apple-touch-icon-60x60.png', sizes: '60x60' },
        { url: '/manifest/apple-touch-icon-72x72.png', sizes: '72x72' },
        { url: '/manifest/apple-touch-icon-76x76.png', sizes: '76x76' },
        { url: '/manifest/apple-touch-icon-114x114.png', sizes: '114x114' },
        { url: '/manifest/apple-touch-icon-120x120.png', sizes: '120x120' },
        { url: '/manifest/apple-touch-icon-144x144.png', sizes: '144x144' },
        { url: '/manifest/apple-touch-icon-152x152.png', sizes: '152x152' },
        { url: '/manifest/apple-touch-icon-167x167.png', sizes: '167x167' },
        { url: '/manifest/apple-touch-icon-180x180.png', sizes: '180x180' },
        { url: '/manifest/apple-touch-icon-1024x1024.png', sizes: '1024x1024' },
      ],
    },
    other: {
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'application-name': t('title'),
      'apple-mobile-web-app-title': t('title'),
    },
    manifest: '/manifest/manifest.webmanifest',
  };
}

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
      { media: '(prefers-color-scheme: dark)', color: '#2f0031' },
      { media: '(prefers-color-scheme: light)', color: '#2f0031' },
    ],
  };
}

export default function LocaleRootLayout({ children }: PropsWithChildren) {
  return children;
}
