import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

import CookieBar from '@/components/master/CookieConsent';
import { ChatBubble } from '@/components/chat_bubble';
import { WheelOfFortune } from '@/components/wheel_of_fortune';
import { cssVars } from '@/styles/theme';
import { useAppSelector } from '@/redux/hooks';
import ContainerGiftFlaps from '@/components/gifts/ContainerGiftFlaps';

import Footer from './Footer';
import Header from './Header';

const StyledLayout = styled.div`
  position: relative;
  min-height: 100vh;
  max-width: ${cssVars.spacing.container};
  padding: 0 ${cssVars.spacing.gap};
  margin: 0 auto;
  background: ${cssVars.color.surface};
`;

const Layout = ({ children }: PropsWithChildren) => {
  const { wheelOfFortune, mockChat } = useAppSelector(
    (state) => state.experience,
  );

  return (
    <>
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

export default Layout;
