import '@/global.css';
import { Analytics } from '@vercel/analytics/react';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getLangDir } from 'rtl-detect';

import { ExperienceDecoratorLayout } from '@/components/ExperienceDecoratorLayout';
import { routing } from '@/i18n/routing';
import { getAppConfigService } from '@/kernel';
import { BeggarBanner } from '@/modules/donation';
import { ClientObservers } from '@/providers/ClientObservers';
import { RootProviderContainer } from '@/providers/RootProviderContainer';

const config = getAppConfigService().getAll();

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- We need the loader even though we are seemingly not using it directly.
const _inter = Inter({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700'],
});

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

async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const direction = getLangDir(locale);
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={direction}
      data-theme={config.defaultColorScheme}
      suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <RootProviderContainer appConfig={config}>
            <ClientObservers />
            <BeggarBanner />
            <ExperienceDecoratorLayout className="font-primary">
              {/* Please add AppHeader in your pages to have SSG/ISR/SSG support while also being able to select the active navigation item */}
              <Analytics />
              {children}
            </ExperienceDecoratorLayout>
          </RootProviderContainer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
