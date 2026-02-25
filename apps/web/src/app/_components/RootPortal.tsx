import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { useRootPortalElement } from '@/contexts/ClientRootPortalProvider';

export function RootPortal({ children }: PropsWithChildren) {
  const portalElement = useRootPortalElement();

  if (!portalElement) {
    return null;
  }

  return createPortal(children, portalElement);
}
