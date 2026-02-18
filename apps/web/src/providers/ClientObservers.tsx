'use client';

import { useZodAutoConfigurator } from './useZodAutoConfigurator';

import {
  useDocumentVisibilityListener,
  useUserActivationListener,
  useNavigationStats,
  useReducedMotionListener,
  useServiceWorker,
} from '@/kernel/application/hooks';

export function ClientObservers() {
  useServiceWorker();
  useNavigationStats();
  useUserActivationListener();
  useDocumentVisibilityListener();
  useReducedMotionListener();
  useZodAutoConfigurator();

  return null;
}
