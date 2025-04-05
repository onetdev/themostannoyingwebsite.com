'use client';

import { FunctionComponent } from 'react';

import useDocumentVisibilityListener from '@/lib/hooks/useDocumentVisibilityListener';
import useFirstInteractionListener from '@/lib/hooks/useFirstInteractionListener';
import useNavigationStats from '@/lib/hooks/useNavigationStats';
import useReducedMotionListener from '@/lib/hooks/useReducedMotionListener';
import useServiceWorker from '@/lib/hooks/useServiceWorker';

const ClientServiceProvider: FunctionComponent = () => {
  useServiceWorker();
  useNavigationStats();
  useFirstInteractionListener();
  useDocumentVisibilityListener();
  useReducedMotionListener();

  return null;
};

export default ClientServiceProvider;
