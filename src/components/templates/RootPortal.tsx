import { FunctionComponent, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { useRootPortalElement } from '@/providers/RootPortalProvider';

export type RootPortalProps = PropsWithChildren;

const RootPortal: FunctionComponent<RootPortalProps> = ({ children }) => {
  const rootPortal = useRootPortalElement();

  if (!rootPortal.node) {
    return null;
  }

  return createPortal(children, rootPortal.node);
};

export default RootPortal;
