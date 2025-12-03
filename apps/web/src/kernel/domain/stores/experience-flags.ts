import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ExperienceFlagsState {
  gifts: {
    detectAdblocker: boolean;
    flaps: boolean;
    oneByOne: boolean;
  };
  clipboardMarker: boolean;
  contentPaywall: boolean;
  deadPixel: boolean;
  disableContextMenu: boolean;
  exitPrompt: boolean;
  historySpam: boolean;
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
  setGifts: (gifts: Partial<ExperienceFlagsState['gifts']>) => void;
  setClipboardMarker: (clipboardMarker: boolean) => void;
  setContentPaywall: (contentPaywall: boolean) => void;
  setDeadPixel: (deadPixel: boolean) => void;
  setDisableContextMenu: (disableContextMenu: boolean) => void;
  setExitPrompt: (exitPrompt: boolean) => void;
  setHistorySpam: (historySpam: boolean) => void;
  setMockChat: (mockChat: boolean) => void;
  setNewsletterModal: (newsletterModal: boolean) => void;
  setNotifications: (notifications: boolean) => void;
  setPageTitle: (pageTitle: Partial<ExperienceFlagsState['pageTitle']>) => void;
  setSearchDelay: (searchDelay: boolean) => void;
  setStickyVideo: (stickyVideo: boolean) => void;
  setWheelOfFortune: (wheelOfFortune: boolean) => void;
  allEnabled: () => void;
  allDisabled: () => void;
}

export interface ExperienceFlagsStore
  extends ExperienceFlagsState, ExperienceFlagsStateActions {}

const initialState: ExperienceFlagsState = {
  gifts: {
    detectAdblocker: true,
    flaps: true,
    oneByOne: true,
  },
  clipboardMarker: true,
  contentPaywall: true,
  deadPixel: true,
  disableContextMenu: true,
  exitPrompt: true,
  historySpam: true,
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
      setGifts: (gifts) =>
        set((state) => ({ gifts: { ...state.gifts, ...gifts } })),
      setClipboardMarker: (clipboardMarker) => set({ clipboardMarker }),
      setContentPaywall: (contentPaywall) => set({ contentPaywall }),
      setDeadPixel: (deadPixel) => set({ deadPixel }),
      setDisableContextMenu: (disableContextMenu) =>
        set({ disableContextMenu: disableContextMenu }),
      setExitPrompt: (exitPrompt) => set({ exitPrompt }),
      setHistorySpam: (historySpam) => set({ historySpam }),
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
      allEnabled: () => set({ ...initialState }),
      allDisabled: () =>
        set({
          gifts: {
            detectAdblocker: false,
            flaps: false,
            oneByOne: false,
          },
          clipboardMarker: false,
          contentPaywall: false,
          deadPixel: false,
          disableContextMenu: false,
          exitPrompt: false,
          historySpam: false,
          mockChat: false,
          newsletterModal: false,
          notifications: false,
          pageTitle: {
            inactiveMarquee: false,
            randomGlitch: false,
            inactiveArrayPaged: false,
          },
          searchDelay: false,
          stickyVideo: false,
          wheelOfFortune: false,
        }),
    }),
    {
      name: 'zustand-experience-flags-storage',
      storage: createJSONStorage(() => localStorage),
      version: 11,
      migrate: (_persistedState, _version) => {
        // Versions are supersets atm, don't need to juggle too much with
        // type states
        const persistedState = _persistedState as ExperienceFlagsStore;

        return {
          ...persistedState,
          gifts: {
            detectAdblocker:
              persistedState.gifts?.detectAdblocker ??
              initialState.gifts.detectAdblocker,
            flaps: persistedState.gifts?.flaps ?? initialState.gifts.flaps,
            oneByOne:
              persistedState.gifts?.oneByOne ?? initialState.gifts.oneByOne,
          },
          pageTitle: {
            inactiveMarquee:
              persistedState.pageTitle?.inactiveMarquee ??
              initialState.pageTitle.inactiveMarquee,
            randomGlitch:
              persistedState.pageTitle?.randomGlitch ??
              initialState.pageTitle.randomGlitch,
            inactiveArrayPaged:
              persistedState.pageTitle?.inactiveArrayPaged ??
              initialState.pageTitle.inactiveArrayPaged,
          },
          version: 11,
        };
      },
    },
  ),
);
