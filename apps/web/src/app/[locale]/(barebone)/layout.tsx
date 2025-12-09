import '@/global.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getLangDir } from 'rtl-detect';

import { routing } from '@/i18n/routing';
import { getAppConfigService } from '@/kernel';
import { RootProviderContainer } from '@/providers/RootProviderContainer';

const config = getAppConfigService().getAll();

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- We need the loader even though we are seemingly not using it directly.
const _inter = Inter({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700'],
});

async function LocaleBareboneRootLayout({
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
            <Analytics />
            {children}
          </RootProviderContainer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default LocaleBareboneRootLayout;
