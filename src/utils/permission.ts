import config from '@/config';

export const getNotificationPermissionState = () =>
  config.isBrowser ? Notification.permission : undefined;

export const getLocationPermissionState = async () =>
  config.isBrowser
    ? (await navigator.permissions.query({ name: 'geolocation' })).state
    : undefined;
