/**
 * @jest-environment jsdom
 */
import {
  getLocationPermissionState,
  getNotificationPermissionState,
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
    window.Notification = originalNotification;
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      configurable: true,
    });
  });

  describe('isBrowser', () => {
    it('should return true in jsdom environment', () => {
      expect(isBrowser()).toBe(true);
    });
  });

  describe('getNotificationPermissionState', () => {
    it('should return permission if Notification is supported', () => {
      // @ts-expect-error
      window.Notification = { permission: 'granted' };
      expect(getNotificationPermissionState()).toBe('granted');
    });

    it('should return undefined if Notification is not supported', () => {
      // @ts-expect-error
      delete window.Notification;
      expect(getNotificationPermissionState()).toBeUndefined();
    });
  });

  describe('requestNotificationPermission', () => {
    it('should return undefined if serviceWorker is not supported', async () => {
      // @ts-expect-error
      window.Notification = { requestPermission: jest.fn() };
      // JSDOM has navigator but we can mock it
      Object.defineProperty(window, 'navigator', {
        value: { serviceWorker: undefined },
        configurable: true,
      });

      const result = await requestNotificationPermission();
      expect(result).toBeUndefined();
    });

    it('should call requestPermission if supported', async () => {
      const mockRequestPermission = jest.fn().mockResolvedValue('granted');
      // @ts-expect-error
      window.Notification = { requestPermission: mockRequestPermission };
      Object.defineProperty(window, 'navigator', {
        value: { serviceWorker: {} },
        configurable: true,
      });

      const result = await requestNotificationPermission();
      expect(mockRequestPermission).toHaveBeenCalled();
      expect(result).toBe('granted');
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
      });

      const result = await getLocationPermissionState();
      expect(mockQuery).toHaveBeenCalledWith({ name: 'geolocation' });
      expect(result).toBe('granted');
    });

    it('should return undefined if permissions API is not supported', async () => {
      Object.defineProperty(window, 'navigator', {
        value: {},
        configurable: true,
      });
      const result = await getLocationPermissionState();
      expect(result).toBeUndefined();
    });
  });
});
