import { isBrowser } from '@maw/ui-lib/utils';

export const getNotificationPermissionState = () =>
  isBrowser() && 'Notification' in window ? Notification.permission : undefined;

export const requestNotificationPermission = async () => {
  if (!isBrowser() || !('Notification' in window) || !navigator.serviceWorker)
    return;

  return await Notification.requestPermission();
};

const hasBrowserPermissionSupport = () =>
  isBrowser() && 'permissions' in navigator;

export const getLocationPermissionState = async () =>
  hasBrowserPermissionSupport()
    ? (await navigator.permissions.query({ name: 'geolocation' })).state
    : undefined;
