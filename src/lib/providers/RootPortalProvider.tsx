import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type RootPortalProps = PropsWithChildren;
type RootPortalContext = HTMLDivElement | undefined;

const RootPortalContext = createContext<RootPortalContext>(undefined);

export const RootPortalProvider: FunctionComponent<RootPortalProps> = ({
  children,
}) => {
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
};

export const useRootPortalElement = () => {
  const portalElement = useContext(RootPortalContext);

  if (!portalElement) {
    throw new Error('useRootPortal must be used within a RootPortalProvider');
  }

  return portalElement;
};
