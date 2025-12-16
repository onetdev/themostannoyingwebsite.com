'use client';

import { useZodAutoConfigurator } from './useZodAutoConfigurator';

import {
  useDocumentVisibilityListener,
  useFirstInteractionListener,
  useNavigationStats,
  useReducedMotionListener,
  useServiceWorker,
} from '@/kernel/application/hooks';

export function ClientObservers() {
  useServiceWorker();
  useNavigationStats();
  useFirstInteractionListener();
  useDocumentVisibilityListener();
  useReducedMotionListener();
  useZodAutoConfigurator();

  return null;
}
