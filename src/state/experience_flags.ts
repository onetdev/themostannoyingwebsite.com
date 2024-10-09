import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ExperienceFlagsState {
  contentPaywall: boolean;
  deadPixelDisease: boolean;
  exitPrompt: boolean;
  mockChat: boolean;
  pageTitle: {
    inactiveArrayPaged: boolean;
    inactiveMarquee: boolean;
    randomGlitch: boolean;
  };
  wheelOfFortune: boolean;
}

export interface ExperienceFlagsStateActions {
  setContentPaywall: (contentPaywall: boolean) => void;
  setDeadPixelDisease: (deadPixelDisease: boolean) => void;
  setExitPrompt: (exitPrompt: boolean) => void;
  setMockChat: (mockChat: boolean) => void;
  setPageTitle: (pageTitle: Partial<ExperienceFlagsState['pageTitle']>) => void;
  setWheelOfFortune: (wheelOfFortune: boolean) => void;
}

export interface ExperienceFlagsStore
  extends ExperienceFlagsState,
    ExperienceFlagsStateActions {}

const initialState: ExperienceFlagsState = {
  contentPaywall: true,
  deadPixelDisease: true,
  exitPrompt: true,
  mockChat: true,
  pageTitle: {
    // `inactiveMarquee` and `randomGlitch` are not enabled because title refresh rate is to low
    // maybe these can be turned on at a later point.
    inactiveMarquee: false,
    randomGlitch: false,
    inactiveArrayPaged: true,
  },
  wheelOfFortune: true,
};

export const useExperienceFlagsStore = create(
  persist<ExperienceFlagsStore>(
    (set) => ({
      ...initialState,
      setContentPaywall: (contentPaywall) => set({ contentPaywall }),
      setDeadPixelDisease: (deadPixelDisease) => set({ deadPixelDisease }),
      setExitPrompt: (exitPrompt) => set({ exitPrompt }),
      setMockChat: (mockChat) => set({ mockChat }),
      setPageTitle: (pageTitle) =>
        set((state) => ({
          pageTitle: {
            ...state.pageTitle,
            ...pageTitle,
          },
        })),
      setWheelOfFortune: (wheelOfFortune) => set({ wheelOfFortune }),
    }),
    {
      name: 'zustand-experience-flags-storage',
      storage: createJSONStorage(() => localStorage),
      version: 2,
    },
  ),
);
