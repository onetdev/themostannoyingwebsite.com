'use client';

import { AnimatePresence } from 'framer-motion';
import { type ComponentProps, useEffect, useState } from 'react';
import { SilentErrorBoundary } from '@/core/react';
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
        {runtimeFlags.giftFlaps && (
          <SilentErrorBoundary
            name="pain:flaps"
            key="container-promotion-flaps"
          >
            <ContainerPromotionFlaps />
          </SilentErrorBoundary>
        )}
      </AnimatePresence>

      {/* Main container and container relative sticky elements */}
      <div className="bg-card relative container mx-auto my-0 min-h-screen">
        {children}
        <AnimatePresence>
          {runtimeFlags.wheelOfFortune && (
            <SilentErrorBoundary
              name="pain:wheel-of-fortune"
              key="wheel-of-fortune"
            >
              <WheelOfFortune />
            </SilentErrorBoundary>
          )}
        </AnimatePresence>
        {runtimeFlags.stickyVideo && (
          <SilentErrorBoundary
            name="pain:sticky-video"
            key="global-sticky-video"
          >
            <GlobalStickyVideo />
          </SilentErrorBoundary>
        )}
        {runtimeFlags.showCookieConsent && (
          <SilentErrorBoundary name="pain:cookie-consent" key="cookie-consent">
            <CookieConsent />
          </SilentErrorBoundary>
        )}
        <SilentErrorBoundary name="pain:adblocker-suspect-bar">
          <AdblockerSuspectBar />
        </SilentErrorBoundary>
      </div>

      {/* Global viewport elements */}
      {deadPixel && (
        <SilentErrorBoundary name="pain:dead-pixel" key="dead-pixel">
          <DeadPixel />
        </SilentErrorBoundary>
      )}
      <AnimatePresence>
        {runtimeFlags.mockChat && (
          <SilentErrorBoundary name="pain:chat-bubble" key="chat-bubble">
            <ChatBubble />
          </SilentErrorBoundary>
        )}
      </AnimatePresence>
      <SilentErrorBoundary name="pain:share-modal">
        <GlobalShareModal />
      </SilentErrorBoundary>
      <SilentErrorBoundary name="pain:screensaver">
        <Screensaver />
      </SilentErrorBoundary>
    </div>
  );
}
