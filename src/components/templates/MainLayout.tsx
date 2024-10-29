import { Analytics } from '@vercel/analytics/react';
import { FunctionComponent } from 'react';

import CookieBar from '@/components/organisms/CookieConsent';
import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';
import { ChatBubbleHost } from '@/features/chat_bubble';
import { DeadPixelHost } from '@/features/dead_pixel';
import ContainerGiftFlaps from '@/features/gifts/components/ContainerGiftFlaps';
import { StickyVideoExperienceHost } from '@/features/sticky_video';
import { WheelOfFortuneHost } from '@/features/wheel_of_fortune';
import { useExperienceFlagsStore } from '@/state/experience_flags';

type MainLayoutProps = JSXProxyProps<'div'>;

const MainLayout: FunctionComponent<MainLayoutProps> = ({
  children,
  className,
  ...rest
}) => {
  const { deadPixel, mockChat, wheelOfFortune } = useExperienceFlagsStore();

  return (
    <div className={className} {...rest}>
      <Analytics />
      <ContainerGiftFlaps />
      <div className="container relative mx-auto my-0 min-h-screen bg-surface px-3 py-2 md:px-5">
        <Header />
        {children}
        <Footer />

        {wheelOfFortune && <WheelOfFortuneHost />}
        {deadPixel && <DeadPixelHost />}
        {mockChat && <ChatBubbleHost />}
        <CookieBar />
        <StickyVideoExperienceHost />
      </div>
    </div>
  );
};

export default MainLayout;
