'use client';

import { useZodAutoConfigurator } from '../hooks/useZodAutoConfigurator';

import {
  useDocumentVisibilityListener,
  useNavigationStats,
  useReducedMotionListener,
  useServiceWorker,
  useTouchScreenListener,
  useUserActivationListener,
} from '@/hooks';

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
