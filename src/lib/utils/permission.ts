import { isBrowser } from './dom';

export const getNotificationPermissionState = () =>
  isBrowser() && 'Notification' in window ? Notification.permission : undefined;

export const requestNotificationPermission = async () => {
  if (!isBrowser() || !('Notification' in window) || !navigator.serviceWorker)
    return;

  return await Notification.requestPermission();
};

export const getLocationPermissionState = async () =>
  isBrowser()
    ? (await navigator.permissions.query({ name: 'geolocation' })).state
    : undefined;
