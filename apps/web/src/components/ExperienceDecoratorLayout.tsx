'use client';

import { FunctionComponent, useEffect, useState } from 'react';

import CookieConsent from '@/components/CookieConsent';
import { ChatBubbleHost } from '@/features/chat_bubble';
import {
  DeadPixelHost,
  StickyVideoExperienceHost,
} from '@/features/obstruction_decor';
import { useExperienceFlagsStore, useUserGrantsStore } from '@/kernel';
import { AdblockerSuspectBar, ContainerGiftFlaps } from '@/modules/gift';
import { WheelOfFortuneHost } from '@/modules/wheel-of-fortune';

type ExperienceDecoratorLayoutProps = JSXProxyProps<'div'>;

export const ExperienceDecoratorLayout: FunctionComponent<
  ExperienceDecoratorLayoutProps
> = ({ children, className, ...rest }) => {
  const deadPixel = useExperienceFlagsStore((state) => state.deadPixel);
  const mockChat = useExperienceFlagsStore((state) => state.mockChat);
  const giftFlaps = useExperienceFlagsStore((state) => state.gifts.flaps);
  const stickyVideo = useExperienceFlagsStore((state) => state.stickyVideo);
  const cookieConsent = useUserGrantsStore((state) => state.reviewCompleted);
  const wheelOfFortune = useExperienceFlagsStore(
    (state) => state.wheelOfFortune,
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
      <div className="bg-surface relative container mx-auto my-0 min-h-screen px-3 py-2 md:px-5">
        {children}
        {runtimeFlags.wheelOfFortune && <WheelOfFortuneHost />}
        {deadPixel && <DeadPixelHost />}
        {runtimeFlags.mockChat && <ChatBubbleHost />}
        {runtimeFlags.showCookieConsent && <CookieConsent />}
        <AdblockerSuspectBar />
        {runtimeFlags.stickyVideo && <StickyVideoExperienceHost />}
      </div>
    </div>
  );
};
