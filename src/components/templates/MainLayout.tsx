import { Analytics } from '@vercel/analytics/react';
import { FunctionComponent } from 'react';

import CookieBar from '@/components/organisms/CookieConsent';
import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';
import { ChatBubbleHost } from '@/features/chat_bubble';
import { ContainerGiftFlaps } from '@/features/gifts';
import { AdblockerSuspectBar } from '@/features/gifts';
import {
  DeadPixelHost,
  StickyVideoExperienceHost,
} from '@/features/obstruction_decor';
import { WheelOfFortuneHost } from '@/features/wheel_of_fortune';
import { useExperienceFlagsStore } from '@/lib/state/experience_flags';

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
        <CookieBar />
        <AdblockerSuspectBar />
        <StickyVideoExperienceHost />
      </div>
    </div>
  );
};

export default MainLayout;
