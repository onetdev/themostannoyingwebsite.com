'use client';

import { Analytics } from '@vercel/analytics/react';
import { FunctionComponent } from 'react';

import CookieConsent from '@/root/apps/web/src/components/organisms/CookieConsent';
import Footer from '@/root/apps/web/src/components/organisms/Footer';
import Header from '@/root/apps/web/src/components/organisms/Header';
import { ChatBubbleHost } from '@/root/apps/web/src/features/chat_bubble';
import { ContainerGiftFlaps } from '@/root/apps/web/src/features/gifts';
import { AdblockerSuspectBar } from '@/root/apps/web/src/features/gifts';
import {
  DeadPixelHost,
  StickyVideoExperienceHost,
} from '@/root/apps/web/src/features/obstruction_decor';
import { WheelOfFortuneHost } from '@/root/apps/web/src/features/wheel_of_fortune';
import { useExperienceFlagsStore } from '@/root/apps/web/src/lib/state/experience_flags';

type MainLayoutProps = JSXProxyProps<'div'>;

const MainLayout: FunctionComponent<MainLayoutProps> = ({
  children,
  className,
  ...rest
}) => {
  const deadPixel = useExperienceFlagsStore((state) => state.deadPixel);
  const mockChat = useExperienceFlagsStore((state) => state.mockChat);
  const giftFlaps = useExperienceFlagsStore((state) => state.gifts.flaps);
  const wheelOfFortune = useExperienceFlagsStore(
    (state) => state.wheelOfFortune,
  );

  return (
    <div className={className} {...rest}>
      <Analytics />
      {giftFlaps && <ContainerGiftFlaps />}
      <div className="container relative mx-auto my-0 min-h-screen bg-surface px-3 py-2 md:px-5">
        <Header />
        {children}
        <Footer />

        {wheelOfFortune && <WheelOfFortuneHost />}
        {deadPixel && <DeadPixelHost />}
        {mockChat && <ChatBubbleHost />}
        <CookieConsent />
        <AdblockerSuspectBar />
        <StickyVideoExperienceHost />
      </div>
    </div>
  );
};

export default MainLayout;
