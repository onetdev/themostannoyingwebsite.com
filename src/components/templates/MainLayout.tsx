import { Analytics } from '@vercel/analytics/react';
import { FunctionComponent } from 'react';

import CookieBar from '@/components/organisms/CookieConsent';
import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';
import { ChatBubbleHost } from '@/features/chat_bubble';
import ContainerGiftFlaps from '@/features/gifts/components/ContainerGiftFlaps';
import { WheelOfFortuneHost } from '@/features/wheel_of_fortune';
import { DeadPixelHost } from '@/root/src/features/dead_pixel';
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
      <div className="container relative mx-auto my-0 min-h-screen bg-surface px-5 py-2">
        <Header />
        {children}
        <Footer />

        {wheelOfFortune && <WheelOfFortuneHost />}
        {deadPixel && <DeadPixelHost />}
        {mockChat && <ChatBubbleHost />}
        <CookieBar />
      </div>
    </div>
  );
};

export default MainLayout;
