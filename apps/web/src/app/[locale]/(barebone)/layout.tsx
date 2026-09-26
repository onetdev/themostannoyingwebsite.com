import '@/app/global.css';
import type { LanguageCode } from '@maw/content-sdk';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import type { PropsWithChildren } from 'react';
import { getLangDir } from 'rtl-detect';
import { ClientRootProviderContainer } from '@/app/bootstrap/ClientRootProviderContainer';
import { routing } from '@/core/i18n/routing';
import { prefetchVariantPools } from '@/features/content/services/prefetch-variant-pools';
import { getAppConfigService } from '@/services';

const config = getAppConfigService().getAll();

// We need the loader even though we are seemingly not using it directly.
const _inter = Inter({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700'],
});

async function LocaleBareboneRootLayout({
  children,
  params,
}: PropsWithChildren<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const direction = getLangDir(locale);
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Global pain widgets (page title glitch, newsletter modal) read their
  // Content API variant pools from the hydrated React Query cache.
  const dehydratedState = await prefetchVariantPools(locale as LanguageCode, [
    'marquee-titles',
    'paged-titles',
    'newsletter-confirmations',
  ]);

  return (
    <html
      lang={locale}
      dir={direction}
      data-theme={config.defaultColorScheme}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider>
          <ClientRootProviderContainer
            appConfig={config}
            dehydratedState={dehydratedState}
          >
            <Analytics />
            {children}
          </ClientRootProviderContainer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default LocaleBareboneRootLayout;
