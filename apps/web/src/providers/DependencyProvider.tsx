import { Container } from 'inversify';
import { FunctionComponent, PropsWithChildren, useMemo } from 'react';

import { DependencyContainer, init as initShared } from '@/kernel';
import { init as initAuth } from '@/modules/auth/init';
import { init as initChatBubble } from '@/modules/chat-bubble/init';
import { init as initGift } from '@/modules/gift/init';
import { init as initNewsletter } from '@/modules/newsletter/init';
import { init as initNotification } from '@/modules/notification/init';
import { init as initWheelOfFortune } from '@/modules/wheel-of-fortune/init';

export const DependencyProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const container = useMemo(() => {
    const container = new Container();

    initShared(container);
    initAuth(container);
    initChatBubble(container);
    initGift(container);
    initNewsletter(container);
    initNotification(container);
    initWheelOfFortune();
    // Register additional modules here

    return container;
  }, []);

  return (
    <DependencyContainer value={{ container }}>{children}</DependencyContainer>
  );
};
