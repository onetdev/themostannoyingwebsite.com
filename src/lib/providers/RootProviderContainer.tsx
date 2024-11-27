import { ThemeProvider } from 'next-themes';
import { FunctionComponent, PropsWithChildren } from 'react';

import useDocumentVisibilityListener from '@/lib/hooks/useDocumentVisibilityListener';
import useFirstInteractionListener from '@/lib/hooks/useFirstInteractionListener';
import useNavigationStats from '@/lib/hooks/useNavigationStats';
import ExperienceProvider from '@/lib/providers/ExperienceProvider';
import { RootPortalProvider } from '@/lib/providers/RootPortalProvider';

const RootProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  useFirstInteractionListener();
  useDocumentVisibilityListener();
  useNavigationStats();

  return (
    <RootPortalProvider>
      <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
        <ExperienceProvider>{children}</ExperienceProvider>
      </ThemeProvider>
    </RootPortalProvider>
  );
};

export default RootProviderContainer;
