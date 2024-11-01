import config from '@/config';

export const getNotificationPermissionState = () =>
  config.isBrowser ? Notification.permission : undefined;

export const requestNotificationPermission = async () => {
  if (!('Notification' in window) || !navigator.serviceWorker) return;

  return await Notification.requestPermission();
};

export const getLocationPermissionState = async () =>
  config.isBrowser
    ? (await navigator.permissions.query({ name: 'geolocation' })).state
    : undefined;
