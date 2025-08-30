import { Container } from 'inversify';
import { FunctionComponent, PropsWithChildren, useMemo } from 'react';

import { init as initAuth } from '@/root/modules/auth/init';
import { DependencyContainer } from '@/root/modules/shared/presentation/dependency-container';

export const DependencyProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const container = useMemo(() => {
    const container = new Container();

    initAuth(container);
    // Register additional modules here

    return container;
  }, []);

  return (
    <DependencyContainer value={{ container }}>{children}</DependencyContainer>
  );
};
