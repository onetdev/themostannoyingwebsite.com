import '@/global.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getLangDir } from 'rtl-detect';

import { routing } from '@/i18n/routing';
import { getAppConfigService } from '@/core';
import { BeggarBanner } from '@/features/donation';
import { ClientObservers } from '@/providers/ClientObservers';
import { RootProviderContainer } from '@/providers/RootProviderContainer';
import { PainDecoratorLayout } from '@/app/_components/PainDecoratorLayout';

const config = getAppConfigService().getAll();

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- We need the loader even though we are seemingly not using it directly.
const _inter = Inter({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700'],
});

async function LocalePublicRootLayout({
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
            <PainDecoratorLayout className="font-primary">
              {/* Please add AppHeader in your pages to have SSG/ISR/SSG support while also being able to select the active navigation item */}
              <Analytics />
              {children}
            </PainDecoratorLayout>
          </RootProviderContainer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default LocalePublicRootLayout;
