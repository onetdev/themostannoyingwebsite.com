import {
  getLocationPermissionState,
  getNotificationPermissionState,
} from '@maw/utils/browser';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const USER_GRANTS_STORAGE_KEY = 'zustand-user-grants-storage';

export interface UserGrantsState {
  reviewCompleted: boolean;
  cookies: {
    essential: boolean;
  };
  permission: {
    location?: PermissionState;
    notification?: NotificationPermission;
  };
}

export interface UserGrantsStateActions {
  setReviewCompleted: (reviewCompleted: boolean) => void;
  setCookieConsent: (
    cookies: Omit<UserGrantsState['cookies'], 'essential'>,
  ) => void;
  syncNotificationPermission: () => void;
  syncLocationPermission: () => void;
  syncPermissions: () => void;
}

export interface UserGrantsStore
  extends UserGrantsState, UserGrantsStateActions {}

const initialState: UserGrantsState = {
  reviewCompleted: false,
  cookies: {
    essential: true,
  },
  permission: {},
};

export const useUserGrantsStore = create<UserGrantsStore>()(
  persist(
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
      name: USER_GRANTS_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
