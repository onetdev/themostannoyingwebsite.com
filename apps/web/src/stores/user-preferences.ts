import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { broadcastChannelSync } from '@/stores/utils/sync';

export const USER_PREFERENCES_STORAGE_KEY = 'zustand-user-preferences-storage';
export interface UserPreferencesState {
  enableSound: boolean;
  adultFilter: boolean;
}

export interface UserPreferencesStateActions {
  setEnableSound: (enableSound: boolean) => void;
  setAdultFilter: (adultFilter: boolean) => void;
}

export interface UserPreferencesStore
  extends UserPreferencesState,
    UserPreferencesStateActions {}

const initialState: UserPreferencesState = {
  enableSound: true,
  adultFilter: true,
};

export const useUserPreferencesStore = create<UserPreferencesStore>()(
  persist(
    broadcastChannelSync<UserPreferencesStore>(USER_PREFERENCES_STORAGE_KEY)(
      (set) => ({
        ...initialState,
        setEnableSound: (enableSound) => set({ enableSound }),
        setAdultFilter: (adultFilter) => set({ adultFilter }),
      }),
    ),
    {
      name: USER_PREFERENCES_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState) => {
        return persistedState;
      },
    },
  ),
);
