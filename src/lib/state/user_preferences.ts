import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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

export const useUserPreferencesStore = create(
  persist<UserPreferencesStore>(
    (set) => ({
      ...initialState,
      setEnableSound: (enableSound) => set({ enableSound }),
      setAdultFilter: (adultFilter) => set({ adultFilter }),
    }),
    {
      name: 'zustand-user-preferences-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
