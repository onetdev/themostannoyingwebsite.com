import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  getLocationPermissionState,
  getNotificationPermissionState,
} from '@/utils/permission';

export interface GrantState {
  reviewCompleted: boolean;
  cookies: {
    essential: boolean;
  };
  permission: {
    location?: PermissionState;
    notification?: NotificationPermission;
  };
}

export interface GrantStateActions {
  setReviewCompleted: (reviewCompleted: boolean) => void;
  setCookieConsent: (cookies: Omit<GrantState['cookies'], 'essential'>) => void;
  syncNotificationPermission: () => void;
  syncLocationPermission: () => void;
  syncPermissions: () => void;
}

const initialState: GrantState = {
  reviewCompleted: false,
  cookies: {
    essential: true,
  },
  permission: {},
};

export const useGrantStore = create(
  persist<GrantState & GrantStateActions>(
    (set) => ({
      ...initialState,
      setReviewCompleted: (reviewCompleted) => set({ reviewCompleted }),
      setCookieConsent: (cookies) =>
        set((state) => ({
          cookies: {
            ...cookies,
            essential: state.cookies.essential,
          },
        })),
      syncNotificationPermission: () =>
        set((state) => ({
          permission: {
            ...state.permission,
            notification: getNotificationPermissionState(),
          },
        })),
      syncLocationPermission: async () => {
        const location = await getLocationPermissionState();
        set((state) => ({
          permission: {
            ...state.permission,
            location,
          },
        }));
      },
      syncPermissions: async () => {
        const location = await getLocationPermissionState();
        const notification = getNotificationPermissionState();
        set({
          permission: {
            location,
            notification,
          },
        });
      },
    }),
    {
      name: 'zustand-grant-storage',
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
    },
  ),
);
