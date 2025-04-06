'use client';

import { FunctionComponent } from 'react';

import useDocumentVisibilityListener from '@/root/apps/web/src/lib/hooks/useDocumentVisibilityListener';
import useFirstInteractionListener from '@/root/apps/web/src/lib/hooks/useFirstInteractionListener';
import useNavigationStats from '@/root/apps/web/src/lib/hooks/useNavigationStats';
import useReducedMotionListener from '@/root/apps/web/src/lib/hooks/useReducedMotionListener';
import useServiceWorker from '@/root/apps/web/src/lib/hooks/useServiceWorker';

const ClientServiceProvider: FunctionComponent = () => {
  useServiceWorker();
  useNavigationStats();
  useFirstInteractionListener();
  useDocumentVisibilityListener();
  useReducedMotionListener();

  return null;
};

export default ClientServiceProvider;
