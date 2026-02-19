'use client';

import { useZodAutoConfigurator } from './useZodAutoConfigurator';

import {
  useDocumentVisibilityListener,
  useNavigationStats,
  useReducedMotionListener,
  useServiceWorker,
  useTouchScreenListener,
  useUserActivationListener,
} from '@/kernel/application/hooks';

export function ClientObservers() {
  useServiceWorker();
  useNavigationStats();
  useUserActivationListener();
  useTouchScreenListener();
  useDocumentVisibilityListener();
  useReducedMotionListener();
  useZodAutoConfigurator();

  return null;
}
