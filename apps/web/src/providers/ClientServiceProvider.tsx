'use client';

import { FunctionComponent } from 'react';

import useDocumentVisibilityListener from '@/hooks/useDocumentVisibilityListener';
import useFirstInteractionListener from '@/hooks/useFirstInteractionListener';
import useNavigationStats from '@/hooks/useNavigationStats';
import useReducedMotionListener from '@/hooks/useReducedMotionListener';
import useServiceWorker from '@/hooks/useServiceWorker';

const ClientServiceProvider: FunctionComponent = () => {
  useServiceWorker();
  useNavigationStats();
  useFirstInteractionListener();
  useDocumentVisibilityListener();
  useReducedMotionListener();

  return null;
};

export default ClientServiceProvider;
