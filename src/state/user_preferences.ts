import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface UserPreferencesState {
  enableSound: boolean;
  enableFlashing: boolean;
  adultFilter: boolean;
}

export interface UserPreferencesStateActions {
  setEnableSound: (enableSound: boolean) => void;
  setEnableFlashing: (enableFlashing: boolean) => void;
  setAdultFilter: (adultFilter: boolean) => void;
}

const initialState: UserPreferencesState = {
  enableSound: true,
  enableFlashing: false,
  adultFilter: true,
};

export const useUserPreferencesStore = create(
  persist<UserPreferencesState & UserPreferencesStateActions>(
    (set) => ({
      ...initialState,
      setEnableSound: (enableSound) => set({ enableSound }),
      setEnableFlashing: (enableFlashing) => set({ enableFlashing }),
      setAdultFilter: (adultFilter) => set({ adultFilter }),
    }),
    {
      name: 'zustand-user-preferences-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
