import { Metadata, Viewport } from "next";
import config from '@/config';
import { Open_Sans } from 'next/font/google';
import RootProviderContainer from "@/lib/providers/RootProviderContainer";
import ClientServiceProvider from "@/lib/providers/ClientServiceProvider";

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

async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme={config.defaultColorScheme}
      style={{ colorScheme: config.defaultColorScheme }}>
      <body>
        <RootProviderContainer>
          <ClientServiceProvider />
          {children}
        </RootProviderContainer>
      </body>
    </html >
  );
}

export default Layout;
