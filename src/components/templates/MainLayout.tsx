import { FunctionComponent, PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';

import CookieBar from '@/components/organisms/CookieConsent';
import { ChatBubble } from '@/features/chat_bubble';
import { WheelOfFortune } from '@/features/wheel_of_fortune';
import cssVars from '@/styles/css_vars';
import { useAppSelector } from '@/redux/hooks';
import ContainerGiftFlaps from '@/features/gifts/components/ContainerGiftFlaps';
import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';

const StyledLayout = styled.div`
  position: relative;
  min-height: 100vh;
  max-width: ${cssVars.spacing.container};
  padding: 0 ${cssVars.spacing.gap};
  margin: 0 auto;
  background: ${cssVars.color.surface};
`;

const MainLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { wheelOfFortune, mockChat } = useAppSelector(
    (state) => state.experience,
  );

  return (
    <>
      <Analytics />
      <ContainerGiftFlaps />
      <StyledLayout>
        <Header />
        {children}
        <Footer />

        {wheelOfFortune && <WheelOfFortune />}
        {mockChat && <ChatBubble />}
        <CookieBar />
      </StyledLayout>
    </>
  );
};

export default MainLayout;
