import { Container } from 'inversify';
import { FunctionComponent, PropsWithChildren, useMemo } from 'react';

import { DependencyContainer, init as initShared } from '@/kernel';
import { init as initAuth } from '@/modules/auth/init';
import { init as initGift } from '@/modules/gift/init';
import { init as initWheelOfFortune } from '@/modules/wheel-of-fortune/init';

export const DependencyProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const container = useMemo(() => {
    const container = new Container();

    initShared(container);
    initAuth(container);
    initGift(container);
    initWheelOfFortune();
    // Register additional modules here

    return container;
  }, []);

  return (
    <DependencyContainer value={{ container }}>{children}</DependencyContainer>
  );
};
