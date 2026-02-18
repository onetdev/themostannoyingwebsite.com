import { create } from 'zustand';

import { FlaimSurveyResult } from '../value-object';

export interface RuntimeState {
  adblockerSuspected: boolean | null;
  document: {
    hasEverBeenVisible: boolean;
    isVisible: boolean;
    visibilitySeconds: number;
  };
  flaimSurveyResult: false | FlaimSurveyResult;
  navigationCount: number;
  userActivation: {
    lastEventAt: number | null;
    unlocked: boolean;
  };
  shareModalData: {
    url?: string;
    visible: boolean;
  };
  startedAt?: string;
  systemReducedMotion: boolean;
}

export interface RuntimeStateActions {
  incrementNavigationCount: () => void;
  incrementVisibilitySeconds: () => void;
  setAdblockerSuspected: (adblockerSuspected: boolean | null) => void;
  setFlaimSurveyResult: (data: RuntimeState['flaimSurveyResult']) => void;
  setIsDocumentVisibile: (isVisible: boolean) => void;
  setShareModalData: (param: RuntimeState['shareModalData']) => void;
  setUserActivation: (param: RuntimeState['userActivation']) => void;
  setReducedMotion: (param: RuntimeState['systemReducedMotion']) => void;
  showShareModal: (param?: RuntimeState['shareModalData']['url']) => void;
}

export interface RuntimeStore extends RuntimeState, RuntimeStateActions {}

const initialState: RuntimeState = {
  adblockerSuspected: null,
  document: {
    hasEverBeenVisible: false,
    isVisible: false,
    visibilitySeconds: 0,
  },
  flaimSurveyResult: false,
  userActivation: {
    lastEventAt: null,
    unlocked: false,
  },
  navigationCount: 0,
  shareModalData: { visible: false },
  startedAt: undefined,
  systemReducedMotion: false,
};

export const useRuntimeStore = create<RuntimeStore>((set) => ({
  ...initialState,
  incrementNavigationCount: () =>
    set((state) => ({ navigationCount: state.navigationCount + 1 })),
  incrementVisibilitySeconds: () =>
    set((state) => ({
      document: {
        ...state.document,
        visibilitySeconds: state.document.visibilitySeconds + 1,
      },
      startedAt: state.startedAt ?? new Date().toISOString(),
    })),
  setAdblockerSuspected: (adblockerSuspected) => set({ adblockerSuspected }),
  setFlaimSurveyResult: (flaimSurveyResult) => set({ flaimSurveyResult }),
  setIsDocumentVisibile: (isVisible) =>
    set((state) => ({
      document: {
        ...state.document,
        hasEverBeenVisible:
          state.document.hasEverBeenVisible || isVisible || false,
        isVisible,
      },
      startedAt: state.startedAt ?? new Date().toISOString(),
    })),
  setUserActivation: ({ lastEventAt, unlocked }) =>
    set((prev) => ({
      userActivation: {
        lastEventAt:
          Math.max(prev.userActivation.lastEventAt ?? 0, lastEventAt ?? 0) ??
          null,
        unlocked: prev.userActivation.unlocked || unlocked,
      },
    })),
  setShareModalData: (shareModalData) => set({ shareModalData }),
  setReducedMotion: (systemReducedMotion) => set({ systemReducedMotion }),
  showShareModal(url) {
    set({ shareModalData: { visible: true, url } });
  },
}));
