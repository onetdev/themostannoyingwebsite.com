import { Container } from 'inversify';
import { PropsWithChildren, useMemo } from 'react';

import { DependencyContainer } from '@/contexts/DependencyContainer';
import { init as initAuth } from '@/features/auth/init';
import { init as initBrowserCore } from '@/features/browser-core/init';
import { init as initContent } from '@/features/content/init';
import { init as initDonation } from '@/features/donation/init';
import { init as initNewsletter } from '@/features/newsletter/init';
import { init as initSubscription } from '@/features/subscription/init';
import { StaticCountryRepository } from '@/repositories';
import { KernelService } from '@/services';
import { DI } from '@/types';

export function AppDependencyContainer({ children }: PropsWithChildren) {
  const container = useMemo(() => {
    const container = new Container();

    container
      .bind(DI.CountryRepository)
      .to(StaticCountryRepository)
      .inSingletonScope();
    container.bind(DI.KernelService).to(KernelService).inSingletonScope();

    initAuth(container);
    initBrowserCore(container);
    initContent(container);
    initDonation(container);
    initNewsletter(container);
    initSubscription(container);
    // Register additional modules here

    return container;
  }, []);

  return (
    <DependencyContainer value={{ container }}>{children}</DependencyContainer>
  );
}
