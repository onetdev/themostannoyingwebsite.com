/**
 * @jest-environment jsdom
 */
import {
  getLocationPermissionState,
  getNotificationPermissionState,
  hasBrowserPermissionSupport,
  isBrowser,
  requestNotificationPermission,
} from './browser';

describe('browser utils', () => {
  const originalNotification = window.Notification;
  const originalNavigator = window.navigator;

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(window, 'Notification', {
      value: originalNotification,
      configurable: true,
      writable: true,
    });
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      configurable: true,
      writable: true,
    });
  });

  describe('isBrowser', () => {
    it('should return true in jsdom environment', () => {
      expect(isBrowser()).toBe(true);
    });
  });

  describe('getNotificationPermissionState', () => {
    it('should return permission if Notification is supported', () => {
      Object.defineProperty(window, 'Notification', {
        value: { permission: 'granted' },
        configurable: true,
        writable: true,
      });
      expect(getNotificationPermissionState()).toBe('granted');
    });

    it('should return undefined if Notification is not supported', () => {
      // @ts-expect-error
      delete window.Notification;
      expect(getNotificationPermissionState()).toBeUndefined();
    });

    it('should return undefined if accessing Notification.permission throws', () => {
      Object.defineProperty(window, 'Notification', {
        value: {
          get permission() {
            throw new Error('Access denied');
          },
        },
        configurable: true,
        writable: true,
      });
      expect(getNotificationPermissionState()).toBeUndefined();
    });
  });

  describe('requestNotificationPermission', () => {
    it('should return undefined if serviceWorker is not supported', async () => {
      Object.defineProperty(window, 'Notification', {
        value: { requestPermission: jest.fn() },
        configurable: true,
        writable: true,
      });
      Object.defineProperty(window, 'navigator', {
        value: { serviceWorker: undefined },
        configurable: true,
        writable: true,
      });

      const result = await requestNotificationPermission();
      expect(result).toBeUndefined();
    });

    it('should call requestPermission if supported', async () => {
      const mockRequestPermission = jest.fn().mockResolvedValue('granted');
      Object.defineProperty(window, 'Notification', {
        value: { requestPermission: mockRequestPermission },
        configurable: true,
        writable: true,
      });
      Object.defineProperty(window, 'navigator', {
        value: { serviceWorker: {} },
        configurable: true,
        writable: true,
      });

      const result = await requestNotificationPermission();
      expect(mockRequestPermission).toHaveBeenCalled();
      expect(result).toBe('granted');
    });

    it('should return undefined if requestPermission throws or rejects', async () => {
      const mockRequestPermission = jest
        .fn()
        .mockRejectedValue(new Error('Permission request blocked'));
      Object.defineProperty(window, 'Notification', {
        value: { requestPermission: mockRequestPermission },
        configurable: true,
        writable: true,
      });
      Object.defineProperty(window, 'navigator', {
        value: { serviceWorker: {} },
        configurable: true,
        writable: true,
      });

      const result = await requestNotificationPermission();
      expect(result).toBeUndefined();
    });
  });

  describe('hasBrowserPermissionSupport', () => {
    it('should return true when navigator.permissions.query is a function', () => {
      Object.defineProperty(window, 'navigator', {
        value: { permissions: { query: jest.fn() } },
        configurable: true,
        writable: true,
      });
      expect(hasBrowserPermissionSupport()).toBe(true);
    });

    it('should return false when permissions is missing or query is not a function', () => {
      Object.defineProperty(window, 'navigator', {
        value: { permissions: {} },
        configurable: true,
        writable: true,
      });
      expect(hasBrowserPermissionSupport()).toBe(false);

      Object.defineProperty(window, 'navigator', {
        value: {},
        configurable: true,
        writable: true,
      });
      expect(hasBrowserPermissionSupport()).toBe(false);
    });
  });

  describe('getLocationPermissionState', () => {
    it('should return state if permissions API is supported', async () => {
      const mockQuery = jest.fn().mockResolvedValue({ state: 'granted' });
      Object.defineProperty(window, 'navigator', {
        value: {
          permissions: { query: mockQuery },
        },
        configurable: true,
        writable: true,
      });

      const result = await getLocationPermissionState();
      expect(mockQuery).toHaveBeenCalledWith({ name: 'geolocation' });
      expect(result).toBe('granted');
    });

    it('should return undefined if permissions API is not supported', async () => {
      Object.defineProperty(window, 'navigator', {
        value: {},
        configurable: true,
        writable: true,
      });
      const result = await getLocationPermissionState();
      expect(result).toBeUndefined();
    });

    it('should return undefined and catch Illegal invocation TypeError thrown synchronously', async () => {
      const mockQuery = jest.fn().mockImplementation(() => {
        throw new TypeError(
          "Failed to execute 'query' on 'Permissions': Illegal invocation",
        );
      });
      Object.defineProperty(window, 'navigator', {
        value: {
          permissions: { query: mockQuery },
        },
        configurable: true,
        writable: true,
      });

      const result = await getLocationPermissionState();
      expect(result).toBeUndefined();
    });

    it('should return undefined and catch Illegal invocation TypeError rejected asynchronously', async () => {
      const mockQuery = jest
        .fn()
        .mockRejectedValue(
          new TypeError(
            "Failed to execute 'query' on 'Permissions': Illegal invocation",
          ),
        );
      Object.defineProperty(window, 'navigator', {
        value: {
          permissions: { query: mockQuery },
        },
        configurable: true,
        writable: true,
      });

      const result = await getLocationPermissionState();
      expect(result).toBeUndefined();
    });
  });
});
