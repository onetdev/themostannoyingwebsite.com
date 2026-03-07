import '@/app/global.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import type { PropsWithChildren } from 'react';
import { getLangDir } from 'rtl-detect';
import { ClientObserverProvider } from '@/app/bootstrap/ClientObserverProvider';
import { ClientRootProviderContainer } from '@/app/bootstrap/ClientRootProviderContainer';
import { BeggarBanner } from '@/features/funding/components';
import { routing } from '@/i18n/routing';
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

  return (
    <html
      lang={locale}
      dir={direction}
      data-theme={config.defaultColorScheme}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider>
          <ClientRootProviderContainer appConfig={config}>
            <ClientObserverProvider />
            <LocaleSuggestion />
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
