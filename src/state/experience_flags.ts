import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ExperienceFlagsState {
  contentPaywall: boolean;
  deadPixel: boolean;
  exitPrompt: boolean;
  mockChat: boolean;
  newsletterModal: boolean;
  notifications: boolean;
  pageTitle: {
    inactiveArrayPaged: boolean;
    inactiveMarquee: boolean;
    randomGlitch: boolean;
  };
  searchDelay: boolean;
  stickyVideo: boolean;
  wheelOfFortune: boolean;
}

export interface ExperienceFlagsStateActions {
  setContentPaywall: (contentPaywall: boolean) => void;
  setDeadPixel: (deadPixel: boolean) => void;
  setExitPrompt: (exitPrompt: boolean) => void;
  setMockChat: (mockChat: boolean) => void;
  setNewsletterModal: (newsletterModal: boolean) => void;
  setNotifications: (notifications: boolean) => void;
  setPageTitle: (pageTitle: Partial<ExperienceFlagsState['pageTitle']>) => void;
  setSearchDelay: (searchDelay: boolean) => void;
  setStickyVideo: (stickyVideo: boolean) => void;
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
  newsletterModal: true,
  notifications: true,
  pageTitle: {
    // `inactiveMarquee` and `randomGlitch` are not enabled because title refresh rate is to low
    // maybe these can be turned on at a later point.
    inactiveMarquee: false,
    randomGlitch: false,
    inactiveArrayPaged: true,
  },
  searchDelay: true,
  stickyVideo: true,
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
      setNewsletterModal: (newsletterModal) => set({ newsletterModal }),
      setNotifications: (notifications) => set({ notifications }),
      setPageTitle: (pageTitle) =>
        set((state) => ({
          pageTitle: {
            ...state.pageTitle,
            ...pageTitle,
          },
        })),
      setSearchDelay: (searchDelay) => set({ searchDelay }),
      setStickyVideo: (stickyVideo) => set({ stickyVideo }),
      setWheelOfFortune: (wheelOfFortune) => set({ wheelOfFortune }),
    }),
    {
      name: 'zustand-experience-flags-storage',
      storage: createJSONStorage(() => localStorage),
      version: 6,
      migrate: (persistedState, _version) => {
        // Versions are supersets atm
        return {
          ...(persistedState as ExperienceFlagsStore),
          version: 6,
        };
      },
    },
  ),
);
