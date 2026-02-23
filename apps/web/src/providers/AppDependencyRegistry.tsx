import { Container } from 'inversify';
import { PropsWithChildren, useMemo } from 'react';

import { DependencyContainer } from '@/contexts/DependencyContainer';
import { init as initShared } from '@/core';
import { init as initAuth } from '@/features/auth/init';
import { init as initBrowserCore } from '@/features/browser-core/init';
import { init as initContent } from '@/features/content/init';
import { init as initDonation } from '@/features/donation/init';
import { init as initNewsletter } from '@/features/newsletter/init';
import { init as initGift } from '@/features/promotion/init';
import { init as initSubscription } from '@/features/subscription/init';

export function AppDependencyContainer({ children }: PropsWithChildren) {
  const container = useMemo(() => {
    const container = new Container();

    initAuth(container);
    initBrowserCore(container);
    initContent(container);
    initDonation(container);
    initGift(container);
    initNewsletter(container);
    initShared(container);
    initSubscription(container);
    // Register additional modules here

    return container;
  }, []);

  return (
    <DependencyContainer value={{ container }}>{children}</DependencyContainer>
  );
}
