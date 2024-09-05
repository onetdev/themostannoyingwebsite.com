import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface ExperienceFlagsState {
  contentPaywall: boolean;
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
  setMockChat: (mockChat: boolean) => void;
  setWheelOfFortune: (wheelOfFortune: boolean) => void;
  setExitPrompt: (exitPrompt: boolean) => void;
  setContentPaywall: (contentPaywall: boolean) => void;
  setPageTitle: (pageTitle: Partial<ExperienceFlagsState['pageTitle']>) => void;
}

const initialState: ExperienceFlagsState = {
  contentPaywall: true,
  exitPrompt: true,
  mockChat: true,
  // `inactiveMarquee` and `randomGlitch` are not enabled because title refresh rate is to low
  // maybe these can be turned on at a later point.
  pageTitle: {
    inactiveMarquee: false,
    randomGlitch: false,
    inactiveArrayPaged: true,
  },
  wheelOfFortune: true,
};

export const useExperienceFlagsStore = create(
  persist<ExperienceFlagsState & ExperienceFlagsStateActions>(
    (set) => ({
      ...initialState,
      setMockChat: (mockChat) => set({ mockChat }),
      setWheelOfFortune: (wheelOfFortune) => set({ wheelOfFortune }),
      setExitPrompt: (exitPrompt) => set({ exitPrompt }),
      setContentPaywall: (contentPaywall) => set({ contentPaywall }),
      setPageTitle: (pageTitle) =>
        set((state) => ({
          pageTitle: {
            ...state.pageTitle,
            ...pageTitle,
          },
        })),
    }),
    {
      name: 'zustand-experience-flags-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
