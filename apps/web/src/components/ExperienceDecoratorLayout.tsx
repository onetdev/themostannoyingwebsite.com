'use client';

import { FunctionComponent, useEffect, useState } from 'react';

import CookieConsent from '@/components/CookieConsent';
import { ChatBubbleHost } from '@/features/chat_bubble';
import { AdblockerSuspectBar, ContainerGiftFlaps } from '@/features/gifts';
import {
  DeadPixelHost,
  StickyVideoExperienceHost,
} from '@/features/obstruction_decor';
import { WheelOfFortuneHost } from '@/features/wheel_of_fortune';
import { useExperienceFlagsStore } from '@/state/experience_flags';

type ExperienceDecoratorLayoutProps = JSXProxyProps<'div'>;

export const ExperienceDecoratorLayout: FunctionComponent<
  ExperienceDecoratorLayoutProps
> = ({ children, className, ...rest }) => {
  const deadPixel = useExperienceFlagsStore((state) => state.deadPixel);
  const mockChat = useExperienceFlagsStore((state) => state.mockChat);
  const giftFlaps = useExperienceFlagsStore((state) => state.gifts.flaps);
  const wheelOfFortune = useExperienceFlagsStore(
    (state) => state.wheelOfFortune,
  );

  // Important thing to note here:
  // Tha fact that server side state and client side state are different and
  // since some of the elements cause huge layout shift we want to perform
  // them only if neccessary.

  const [runtimeFlags, setRuntimeFlags] = useState(() => ({
    giftFlaps: false,
    mockChat: false,
    wheelOfFortune: false,
  }));

  useEffect(() => {
    setRuntimeFlags({
      giftFlaps,
      mockChat,
      wheelOfFortune,
    });
  }, [giftFlaps, mockChat, wheelOfFortune]);

  return (
    <div className={className} {...rest}>
      {runtimeFlags.giftFlaps && <ContainerGiftFlaps />}
      <div className="bg-surface relative container mx-auto my-0 min-h-screen px-3 py-2 md:px-5">
        {children}
        {runtimeFlags.wheelOfFortune && <WheelOfFortuneHost />}
        {deadPixel && <DeadPixelHost />}
        {runtimeFlags.mockChat && <ChatBubbleHost />}
        <CookieConsent />
        <AdblockerSuspectBar />
        <StickyVideoExperienceHost />
      </div>
    </div>
  );
};
