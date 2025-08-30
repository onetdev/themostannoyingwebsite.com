import { Container } from 'inversify';
import { FunctionComponent, PropsWithChildren, useMemo } from 'react';

import { init as initAuth } from '@/modules/auth/init';
import { DependencyContainer } from '@/root/modules/kernel';
import { init as initShared } from '@/root/modules/kernel/init';

export const DependencyProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const container = useMemo(() => {
    const container = new Container();

    initShared(container);
    initAuth(container);
    // Register additional modules here

    return container;
  }, []);

  return (
    <DependencyContainer value={{ container }}>{children}</DependencyContainer>
  );
};
