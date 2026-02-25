'use client';

import {
  useDocumentVisibilityListener,
  useNavigationStats,
  useReducedMotionListener,
  useServiceWorker,
  useTouchScreenListener,
  useUserActivationListener,
  useZodAutoConfigurator,
} from '../hooks';

export function ClientObserverProvider() {
  useServiceWorker();
  useNavigationStats();
  useUserActivationListener();
  useTouchScreenListener();
  useDocumentVisibilityListener();
  useReducedMotionListener();
  useZodAutoConfigurator();

  return null;
}
