import { Metadata, Viewport } from "next";
import config from '@/config';
import { Open_Sans } from 'next/font/google';
import RootProviderContainer from "@/lib/providers/RootProviderContainer";
import ClientServiceProvider from "@/lib/providers/ClientServiceProvider";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {getLangDir} from 'rtl-detect';

const _openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(config.publicUrl),
    title: {
      default: 'The Most Annoying Website',
      template: '%title% | The Most Annoying Website'
    },
    description: 'Endless pop-ups, auto-playing videos, infinite scroll, and a barrage of ads—experience the internet at its worst. Slow load times, misleading buttons, and constant CAPTCHA challenges included!',
    openGraph: {
      siteName: 'The Most Annoying Website',
      type: 'website',
      images: [
        {
          url: '/assets/social.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    robots: {
      index: true,
      follow: true
    },
    // TODO: Add GeneratedMetaHead
  }
}

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
  }
}

async function RootLayout({
  children,
  params
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
      style={{ colorScheme: config.defaultColorScheme }}>
      <body>
        <NextIntlClientProvider>
          <RootProviderContainer>
            <ClientServiceProvider />
            {children}
          </RootProviderContainer>
        </NextIntlClientProvider>
      </body>
    </html >
  );
}

export default RootLayout;
