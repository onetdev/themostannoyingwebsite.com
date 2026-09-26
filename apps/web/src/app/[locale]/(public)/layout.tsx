import '@/app/global.css';
import type { LanguageCode } from '@maw/content-sdk';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import type { PropsWithChildren } from 'react';
import { getLangDir } from 'rtl-detect';
import { ClientObserverProvider } from '@/app/bootstrap/ClientObserverProvider';
import { ClientRootProviderContainer } from '@/app/bootstrap/ClientRootProviderContainer';
import { LanguageDetectorMessagesProvider } from '@/core/i18n/LanguageDetectorMessagesProvider';
import { fetchAllLanguageDetectorMessages } from '@/core/i18n/language-detector-messages';
import { routing } from '@/core/i18n/routing';
import { SiteStructuredData } from '@/core/seo';
import { prefetchVariantPools } from '@/features/content/services/prefetch-variant-pools';
import { BeggarBanner } from '@/features/funding/components';
import { SUPPORTED_LANGUAGES } from '@/i18n/supported-locales';
import { getAppConfigService } from '@/services';
import { LocaleSuggestion } from './_components/LocaleSuggestion';
import { PainDecoratorLayout } from './_components/PainDecoratorLayout';

const config = getAppConfigService().getAll();

// We need the loader even though we are seemingly not using it directly.
const _inter = Inter({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700'],
});

async function LocalePublicRootLayout({
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

  // Global pain widgets (page title glitch, newsletter modal, chat bubble)
  // read their Content API variant pools from the hydrated React Query cache.
  // The language-suggestion toast needs the detector copy for every supported
  // locale so it can render in the suggested language.
  const [dehydratedState, detectorMessages] = await Promise.all([
    prefetchVariantPools(locale as LanguageCode, [
      'marquee-titles',
      'paged-titles',
      'newsletter-confirmations',
      'chat-bubble-messages',
    ]),
    fetchAllLanguageDetectorMessages(
      SUPPORTED_LANGUAGES.map((language) => language.locale),
    ),
  ]);

  return (
    <html
      lang={locale}
      dir={direction}
      data-theme={config.defaultColorScheme}
      suppressHydrationWarning
    >
      <body>
        <SiteStructuredData locale={locale as AppLocale} />
        <NextIntlClientProvider>
          <ClientRootProviderContainer
            appConfig={config}
            dehydratedState={dehydratedState}
          >
            <ClientObserverProvider />
            <LanguageDetectorMessagesProvider value={detectorMessages}>
              <LocaleSuggestion />
            </LanguageDetectorMessagesProvider>
            <BeggarBanner />
            <PainDecoratorLayout className="font-primary">
              {/* Please add AppHeader in your pages to have SSG/ISR/SSG support while also being able to select the active navigation item */}
              <Analytics />
              {children}
            </PainDecoratorLayout>
          </ClientRootProviderContainer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default LocalePublicRootLayout;
