'use client';

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type ClientRootPortalContext = HTMLDivElement | undefined;

const ClientRootPortalContext =
  createContext<ClientRootPortalContext>(undefined);

export function ClientRootPortalProvider({ children }: PropsWithChildren) {
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
    <ClientRootPortalContext.Provider value={portalElement}>
      {children}
    </ClientRootPortalContext.Provider>
  );
}

export const useRootPortalElement = () => {
  const portalElement = useContext(ClientRootPortalContext);

  if (!portalElement) {
    throw new Error('useRootPortal must be used within a RootPortalProvider');
  }

  return portalElement;
};
