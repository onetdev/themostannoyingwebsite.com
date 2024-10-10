import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type RootPortalProps = PropsWithChildren;
type RootPortalContextValue = { node?: HTMLDivElement | undefined };

const RootPortalContext = createContext<RootPortalContextValue>({
  node: undefined,
});

export const RootPortalProvider: FunctionComponent<RootPortalProps> = ({
  children,
}) => {
  const [node, setPortalElement] = useState<HTMLDivElement>();

  useEffect(() => {
    const portalDiv = document.createElement('div');
    document.body.appendChild(portalDiv);
    setPortalElement(portalDiv);

    return () => {
      document.body.removeChild(portalDiv);
    };
  }, []);

  return (
    <RootPortalContext.Provider value={{ node }}>
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
