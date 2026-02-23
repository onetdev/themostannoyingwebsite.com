'use client';

import { useEffect, useState } from 'react';

import CookieConsent from '@/components/CookieConsent';
import { Screensaver } from '@/components/Screensaver';
import { ShareModal } from '@/core';
import { ChatBubbleHost } from '@/features/chat-bubble';
import { AdblockerSuspectBar, ContainerGiftFlaps } from '@/features/gift';
import {
  DeadPixelHost,
  GlobalStickyVideoHost,
} from '@/features/obstruction-decor';
import { WheelOfFortuneHost } from '@/features/wheel-of-fortune';
import { usePainPreferencesStore, useUserGrantsStore } from '@/stores';

type PainDecoratorLayoutProps = JSXProxyProps<'div'>;

export function PainDecoratorLayout({
  children,
  className,
  ...rest
}: PainDecoratorLayoutProps) {
  const cookieConsent = useUserGrantsStore((state) => state.reviewCompleted);
  const deadPixel = usePainPreferencesStore((state) => state.flags.deadPixel);
  const mockChat = usePainPreferencesStore((state) => state.flags.mockChat);
  const giftFlaps = usePainPreferencesStore(
    (state) => state.flags['gifts.flaps'],
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
      {runtimeFlags.giftFlaps && <ContainerGiftFlaps />}
      <div className="bg-card relative container mx-auto my-0 min-h-screen">
        {children}
        {runtimeFlags.wheelOfFortune && <WheelOfFortuneHost />}
        {deadPixel && <DeadPixelHost />}
        {runtimeFlags.mockChat && <ChatBubbleHost />}
        {runtimeFlags.showCookieConsent && <CookieConsent />}
        <AdblockerSuspectBar />
        {runtimeFlags.stickyVideo && <GlobalStickyVideoHost />}
        <ShareModal />
        <Screensaver />
      </div>
    </div>
  );
}
