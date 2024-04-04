import config from '@/config';

export const getNotificationPermissionState = () =>
  config.isBrowser ? Notification.permission : undefined;

export const getLocationPermissionState = async () =>
  config.isBrowser
    ? navigator.permissions.query({ name: 'geolocation' })
    : undefined;
