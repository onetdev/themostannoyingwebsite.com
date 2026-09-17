export const isBrowser = () => typeof window !== 'undefined';

export const getNotificationPermissionState = ():
  | NotificationPermission
  | undefined => {
  if (!isBrowser() || !('Notification' in window)) {
    return undefined;
  }

  try {
    return Notification.permission;
  } catch {
    return undefined;
  }
};

export const requestNotificationPermission = async (): Promise<
  NotificationPermission | undefined
> => {
  if (!isBrowser() || !('Notification' in window) || !navigator.serviceWorker) {
    return undefined;
  }

  try {
    return await Notification.requestPermission();
  } catch {
    return undefined;
  }
};

export const hasBrowserPermissionSupport = () =>
  isBrowser() &&
  typeof navigator !== 'undefined' &&
  'permissions' in navigator &&
  typeof navigator.permissions?.query === 'function';

export const getLocationPermissionState = async (): Promise<
  PermissionState | undefined
> => {
  if (!hasBrowserPermissionSupport()) {
    return undefined;
  }

  try {
    const status = await navigator.permissions.query({ name: 'geolocation' });
    return status?.state;
  } catch {
    return undefined;
  }
};
