import { Container } from 'inversify';
import { FunctionComponent, PropsWithChildren, useMemo } from 'react';

import { init as initShared } from '@/core';
import { init as initAuth } from '@/features/auth/init';
import { init as initBrowserCore } from '@/features/browser-core/init';
import { init as initChatBubble } from '@/features/chat-bubble/init';
import { init as initContent } from '@/features/content/init';
import { init as initDonation } from '@/features/donation/init';
import { init as initGift } from '@/features/promotions/init';
import { init as initNewsletter } from '@/features/newsletter/init';
import { init as initNotification } from '@/features/notification/init';
import { init as initSubscription } from '@/features/subscription/init';
import { DependencyContainer } from './DependencyContainer';

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
    initShared(container);
    initSubscription(container);
    // Register additional modules here

    return container;
  }, []);

  return (
    <DependencyContainer value={{ container }}>{children}</DependencyContainer>
  );
};
