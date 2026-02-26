import {
  getLocationPermissionState,
  getNotificationPermissionState,
  isBrowser,
  requestNotificationPermission,
} from './browser';

describe('browser utils', () => {
  const originalWindow = global.window;
  const originalNavigator = global.navigator;
  const originalNotification = (global as any).Notification;

  afterEach(() => {
    global.window = originalWindow;
    global.navigator = originalNavigator;
    (global as any).Notification = originalNotification;
    jest.restoreAllMocks();
  });

  describe('isBrowser', () => {
    it('should return true if window is defined', () => {
      global.window = {} as any;
      expect(isBrowser()).toBe(true);
    });

    it('should return false if window is undefined', () => {
      delete global.window;
      expect(isBrowser()).toBe(false);
    });
  });

  describe('getNotificationPermissionState', () => {
    it('should return undefined if not in browser', () => {
      delete global.window;
      expect(getNotificationPermissionState()).toBeUndefined();
    });

    it('should return permission if Notification is in window', () => {
      global.window = {
        Notification: { permission: 'granted' },
      } as any;
      (global as any).Notification = { permission: 'granted' };
      expect(getNotificationPermissionState()).toBe('granted');
    });
  });

  describe('requestNotificationPermission', () => {
    it('should return undefined if not in browser or Notification not in window', async () => {
      delete global.window;
      const result = await requestNotificationPermission();
      expect(result).toBeUndefined();
    });

    it('should call requestPermission if supported', async () => {
      const mockRequestPermission = jest.fn().mockResolvedValue('granted');
      global.window = {
        Notification: { requestPermission: mockRequestPermission },
      } as any;
      global.navigator = { serviceWorker: {} } as any;
      (global as any).Notification = {
        requestPermission: mockRequestPermission,
      };

      const result = await requestNotificationPermission();
      expect(mockRequestPermission).toHaveBeenCalled();
      expect(result).toBe('granted');
    });
  });

  describe('getLocationPermissionState', () => {
    it('should return state if supported', async () => {
      const mockQuery = jest.fn().mockResolvedValue({ state: 'granted' });
      global.window = {} as any;
      global.navigator = {
        permissions: { query: mockQuery },
      } as any;

      const result = await getLocationPermissionState();
      expect(mockQuery).toHaveBeenCalledWith({ name: 'geolocation' });
      expect(result).toBe('granted');
    });

    it('should return undefined if permissions not in navigator', async () => {
      global.window = {} as any;
      global.navigator = {} as any;
      const result = await getLocationPermissionState();
      expect(result).toBeUndefined();
    });
  });
});
