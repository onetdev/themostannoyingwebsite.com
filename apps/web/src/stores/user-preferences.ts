import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { broadcastChannelSync } from '@/stores/utils/sync';

export const USER_PREFERENCES_STORAGE_KEY = 'zustand-user-preferences-storage';
export interface UserPreferencesState {
  enableSound: boolean;
  adultFilter: boolean;
  donationLastDismissedDate: string | null;
  switchLanguageToastDisplayedDate: string | null;
  isReady: boolean;
}

export interface UserPreferencesStateActions {
  setEnableSound: (enableSound: boolean) => void;
  setAdultFilter: (adultFilter: boolean) => void;
  setDonationLastDismissedDate: (date: string | null) => void;
  setSwitchLanguageToastDisplayedDate: (date: string | null) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export interface UserPreferencesStore
  extends UserPreferencesState,
    UserPreferencesStateActions {}

const initialState: UserPreferencesState = {
  enableSound: true,
  adultFilter: true,
  donationLastDismissedDate: null,
  switchLanguageToastDisplayedDate: null,
  isReady: false,
};

export const useUserPreferencesStore = create<UserPreferencesStore>()(
  persist(
    broadcastChannelSync<UserPreferencesStore>(USER_PREFERENCES_STORAGE_KEY)(
      (set) => ({
        ...initialState,
        setEnableSound: (enableSound) => set({ enableSound }),
        setAdultFilter: (adultFilter) => set({ adultFilter }),
        setDonationLastDismissedDate: (donationLastDismissedDate) =>
          set({ donationLastDismissedDate }),
        setSwitchLanguageToastDisplayedDate: (
          switchLanguageToastDisplayedDate,
        ) => set({ switchLanguageToastDisplayedDate }),
        setHasHydrated: (_hasHydrated) => set({ isReady: _hasHydrated }),
      }),
    ),
    {
      name: USER_PREFERENCES_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 2,
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
      partialize: (state) => {
        // We only want to store props under rest.
        const { isReady, ...rest } = state;
        return rest;
      },
      migrate: (persistedState) => {
        return persistedState;
      },
    },
  ),
);
