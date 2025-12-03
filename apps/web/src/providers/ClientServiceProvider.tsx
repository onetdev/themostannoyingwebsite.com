'use client';

import { FunctionComponent } from 'react';

import {
  useDocumentVisibilityListener,
  useFirstInteractionListener,
  useNavigationStats,
  useReducedMotionListener,
  useServiceWorker,
} from '@/kernel/application/hooks';

export const ClientServiceProvider: FunctionComponent = () => {
  useServiceWorker();
  useNavigationStats();
  useFirstInteractionListener();
  useDocumentVisibilityListener();
  useReducedMotionListener();

  return null;
};
