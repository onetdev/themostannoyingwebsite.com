import { ThemeProvider } from 'next-themes';
import { FunctionComponent, PropsWithChildren } from 'react';

import useDocumentVisibilityListener from '@/lib/hooks/useDocumentVisibilityListener';
import useFirstInteractionListener from '@/lib/hooks/useFirstInteractionListener';
import useNavigationStats from '@/lib/hooks/useNavigationStats';
import useReducedMotionListener from '@/lib/hooks/useReducedMotionListener';
import useServiceWorker from '@/lib/hooks/useServiceWorker';
import ExperienceProvider from '@/lib/providers/ExperienceProvider';
import { RootPortalProvider } from '@/lib/providers/RootPortalProvider';

const RootProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  useServiceWorker();
  useNavigationStats();
  useFirstInteractionListener();
  useDocumentVisibilityListener();
  useReducedMotionListener();

  return (
    <RootPortalProvider>
      <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
        <ExperienceProvider>{children}</ExperienceProvider>
      </ThemeProvider>
    </RootPortalProvider>
  );
};

export default RootProviderContainer;
