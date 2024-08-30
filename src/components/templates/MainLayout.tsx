import { FunctionComponent, PropsWithoutRef } from 'react';
import { Analytics } from '@vercel/analytics/react';

import CookieBar from '@/components/organisms/CookieConsent';
import { ChatBubbleHost } from '@/features/chat_bubble';
import { WheelOfFortune } from '@/features/wheel_of_fortune';
import ContainerGiftFlaps from '@/features/gifts/components/ContainerGiftFlaps';
import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';
import { useExperienceStore } from '@/state/experience';

type Props = PropsWithoutRef<JSX.IntrinsicElements['div']>;

const MainLayout: FunctionComponent<Props> = ({
  children,
  className,
  ...rest
}) => {
  const { wheelOfFortune, mockChat } = useExperienceStore();

  return (
    <div className={className} {...rest}>
      <Analytics />
      <ContainerGiftFlaps />
      <div className="container relative mx-auto my-0 min-h-screen bg-surface px-2 py-0">
        <Header />
        {children}
        <Footer />

        {wheelOfFortune && <WheelOfFortune />}
        {mockChat && <ChatBubbleHost />}
        <CookieBar />
      </div>
    </div>
  );
};

export default MainLayout;
