'use client';

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type RootPortalContext = HTMLDivElement | undefined;

const RootPortalContext = createContext<RootPortalContext>(undefined);

export function RootPortalProvider({ children }: PropsWithChildren) {
  const [portalElement, setPortalElement] = useState<HTMLDivElement>();

  useEffect(() => {
    const portalDiv = document.createElement('div');
    document.body.appendChild(portalDiv);
    setPortalElement(portalDiv);

    return () => {
      document.body.removeChild(portalDiv);
    };
  }, []);

  return (
    <RootPortalContext.Provider value={portalElement}>
      {children}
    </RootPortalContext.Provider>
  );
}

export const useRootPortalElement = () => {
  const portalElement = useContext(RootPortalContext);

  if (!portalElement) {
    throw new Error('useRootPortal must be used within a RootPortalProvider');
  }

  return portalElement;
};
