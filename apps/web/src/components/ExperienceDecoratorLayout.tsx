'use client';

import { FunctionComponent } from 'react';

import CookieConsent from '@/components/CookieConsent';
import { ChatBubbleHost } from '@/features/chat_bubble';
import { ContainerGiftFlaps } from '@/features/gifts';
import { AdblockerSuspectBar } from '@/features/gifts';
import {
  DeadPixelHost,
  StickyVideoExperienceHost,
} from '@/features/obstruction_decor';
import { WheelOfFortuneHost } from '@/features/wheel_of_fortune';
import { useExperienceFlagsStore } from '@/lib/state/experience_flags';

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

  return (
    <div className={className} {...rest}>
      {giftFlaps && <ContainerGiftFlaps />}
      <div className="bg-surface relative container mx-auto my-0 min-h-screen px-3 py-2 md:px-5">
        {children}
        {wheelOfFortune && <WheelOfFortuneHost />}
        {deadPixel && <DeadPixelHost />}
        {mockChat && <ChatBubbleHost />}
        <CookieConsent />
        <AdblockerSuspectBar />
        <StickyVideoExperienceHost />
      </div>
    </div>
  );
};
