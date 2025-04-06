import { FunctionComponent, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { useRootPortalElement } from '@/root/apps/web/src/lib/providers/RootPortalProvider';

export type RootPortalProps = PropsWithChildren;

const RootPortal: FunctionComponent<RootPortalProps> = ({ children }) => {
  const portalElement = useRootPortalElement();

  if (!portalElement) {
    return null;
  }

  return createPortal(children, portalElement);
};

export default RootPortal;
