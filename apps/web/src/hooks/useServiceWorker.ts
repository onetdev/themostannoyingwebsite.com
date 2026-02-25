'use client';

import { useEffect } from 'react';

export const useServiceWorker = () => {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.info(
          `Service Worker registered for scope: ${registration.scope}`,
        );
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }, []);
};
