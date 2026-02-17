import { Container } from 'inversify';
import { FunctionComponent, PropsWithChildren, useMemo } from 'react';

import { DependencyContainer, init as initShared } from '@/kernel';
import { init as initAuth } from '@/modules/auth/init';
import { init as initBrowserCore } from '@/modules/browser-core/init';
import { init as initChatBubble } from '@/modules/chat-bubble/init';
import { init as initContent } from '@/modules/content/init';
import { init as initDonation } from '@/modules/donation/init';
import { init as initGift } from '@/modules/gift/init';
import { init as initNewsletter } from '@/modules/newsletter/init';
import { init as initNotification } from '@/modules/notification/init';
import { init as initObstructionDecor } from '@/modules/obstruction-decor/init';
import { init as initSubscription } from '@/modules/subscription/init';
import { init as initWheelOfFortune } from '@/modules/wheel-of-fortune/init';

export const DependencyProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const container = useMemo(() => {
    const container = new Container();

    initAuth(container);
    initBrowserCore(container);
    initChatBubble(container);
    initContent(container);
    initDonation(container);
    initGift(container);
    initNewsletter(container);
    initNotification(container);
    initObstructionDecor(container);
    initShared(container);
    initSubscription(container);
    initWheelOfFortune();
    // Register additional modules here

    return container;
  }, []);

  return (
    <DependencyContainer value={{ container }}>{children}</DependencyContainer>
  );
};
