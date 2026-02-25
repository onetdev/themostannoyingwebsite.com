import '@/global.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getLangDir } from 'rtl-detect';

import { PainDecoratorLayout } from '@/app/_components/PainDecoratorLayout';
import { BeggarBanner } from '@/features/donation/components';
import { routing } from '@/i18n/routing';
import { ClientObserverProvider } from '@/providers/ClientObserverProvider';
import { ClientRootProviderContainer } from '@/providers/ClientRootProviderContainer';
import { getAppConfigService } from '@/services';

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
          <ClientRootProviderContainer appConfig={config}>
            <ClientObserverProvider />
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
