import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ExperienceFlagsState {
  contentPaywall: boolean;
  deadPixel: boolean;
  exitPrompt: boolean;
  mockChat: boolean;
  pageTitle: {
    inactiveArrayPaged: boolean;
    inactiveMarquee: boolean;
    randomGlitch: boolean;
  };
  searchDelay: boolean;
  wheelOfFortune: boolean;
}

export interface ExperienceFlagsStateActions {
  setContentPaywall: (contentPaywall: boolean) => void;
  setDeadPixel: (deadPixel: boolean) => void;
  setExitPrompt: (exitPrompt: boolean) => void;
  setMockChat: (mockChat: boolean) => void;
  setPageTitle: (pageTitle: Partial<ExperienceFlagsState['pageTitle']>) => void;
  setSearchDelay: (searchDelay: boolean) => void;
  setWheelOfFortune: (wheelOfFortune: boolean) => void;
}

export interface ExperienceFlagsStore
  extends ExperienceFlagsState,
    ExperienceFlagsStateActions {}

const initialState: ExperienceFlagsState = {
  contentPaywall: true,
  deadPixel: true,
  exitPrompt: true,
  mockChat: true,
  pageTitle: {
    // `inactiveMarquee` and `randomGlitch` are not enabled because title refresh rate is to low
    // maybe these can be turned on at a later point.
    inactiveMarquee: false,
    randomGlitch: false,
    inactiveArrayPaged: true,
  },
  searchDelay: true,
  wheelOfFortune: true,
};

export const useExperienceFlagsStore = create(
  persist<ExperienceFlagsStore>(
    (set) => ({
      ...initialState,
      setContentPaywall: (contentPaywall) => set({ contentPaywall }),
      setDeadPixel: (deadPixel) => set({ deadPixel }),
      setExitPrompt: (exitPrompt) => set({ exitPrompt }),
      setMockChat: (mockChat) => set({ mockChat }),
      setPageTitle: (pageTitle) =>
        set((state) => ({
          pageTitle: {
            ...state.pageTitle,
            ...pageTitle,
          },
        })),
      setSearchDelay: (searchDelay) => set({ searchDelay }),
      setWheelOfFortune: (wheelOfFortune) => set({ wheelOfFortune }),
    }),
    {
      name: 'zustand-experience-flags-storage',
      storage: createJSONStorage(() => localStorage),
      version: 3,
      migrate: (persistedState, _version) => {
        // Versions are supersets atm
        return {
          ...(persistedState as ExperienceFlagsStore),
          version: 3,
        };
      },
    },
  ),
);
