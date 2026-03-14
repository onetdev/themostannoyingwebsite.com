'use client';

import { AnimatePresence } from 'framer-motion';
import { type ComponentProps, useEffect, useState } from 'react';
import {
  DeadPixel,
  GlobalStickyVideo,
  Screensaver,
} from '@/features/disruptions/components';
import {
  AdblockerSuspectBar,
  ContainerPromotionFlaps,
  WheelOfFortune,
} from '@/features/marketing/components';
import { ChatBubble } from '@/features/support/components';
import { usePainPreferencesStore, useUserGrantsStore } from '@/stores';
import { CookieConsent } from './CookieConsent';
import { GlobalShareModal } from './GlobalShareModal';

type PainDecoratorLayoutProps = ComponentProps<'div'>;

export function PainDecoratorLayout({
  children,
  className,
  ...rest
}: PainDecoratorLayoutProps) {
  const cookieConsent = useUserGrantsStore((state) => state.reviewCompleted);
  const deadPixel = usePainPreferencesStore((state) => state.flags.deadPixel);
  const mockChat = usePainPreferencesStore((state) => state.flags.mockChat);
  const giftFlaps = usePainPreferencesStore(
    (state) => state.flags['promotions.flaps'],
  );
  const stickyVideo = usePainPreferencesStore(
    (state) => state.flags.stickyVideo,
  );
  const wheelOfFortune = usePainPreferencesStore(
    (state) => state.flags.wheelOfFortune,
  );

  // Important thing to note here:
  // Tha fact that server side state and client side state are different and
  // since some of the elements cause huge layout shift we want to perform
  // them only if neccessary.

  const [runtimeFlags, setRuntimeFlags] = useState(() => ({
    showCookieConsent: false,
    giftFlaps: false,
    mockChat: false,
    stickyVideo: false,
    wheelOfFortune: false,
  }));

  useEffect(() => {
    setRuntimeFlags({
      showCookieConsent: !cookieConsent,
      giftFlaps,
      mockChat,
      stickyVideo,
      wheelOfFortune,
    });
  }, [cookieConsent, giftFlaps, mockChat, stickyVideo, wheelOfFortune]);

  return (
    <div className={className} {...rest}>
      {/* Elements appearing underneath content container */}
      <AnimatePresence>
        {runtimeFlags.giftFlaps && <ContainerPromotionFlaps />}
      </AnimatePresence>

      {/* Main container and container relative sticky elements */}
      <div className="bg-card relative container mx-auto my-0 min-h-screen">
        {children}
        <AnimatePresence>
          {runtimeFlags.wheelOfFortune && <WheelOfFortune />}
        </AnimatePresence>
        {runtimeFlags.stickyVideo && <GlobalStickyVideo />}
        {runtimeFlags.showCookieConsent && <CookieConsent />}
        <AdblockerSuspectBar />
      </div>

      {/* Global viewport elements */}
      {deadPixel && <DeadPixel />}
      <AnimatePresence>
        {runtimeFlags.mockChat && <ChatBubble />}
      </AnimatePresence>
      <GlobalShareModal />
      <Screensaver />
    </div>
  );
}
