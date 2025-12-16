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
  interactionUnlocked: boolean;
  navigationCount: number;
  reducedMotion: boolean;
  shareModalData: {
    url?: string;
    visible: boolean;
  };
  startedAt?: string;
}

export interface RuntimeStateActions {
  incrementNavigationCount: () => void;
  incrementVisibilitySeconds: () => void;
  markInteractionUnlocked: () => void;
  setAdblockerSuspected: (adblockerSuspected: boolean | null) => void;
  setFlaimSurveyResult: (data: RuntimeState['flaimSurveyResult']) => void;
  setIsDocumentVisibile: (isVisible: boolean) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  setShareModalData: (param: RuntimeState['shareModalData']) => void;
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
  interactionUnlocked: false,
  navigationCount: 0,
  reducedMotion: true,
  shareModalData: { visible: false },
  startedAt: undefined,
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
  markInteractionUnlocked: () => set({ interactionUnlocked: true }),
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
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setShareModalData: (shareModalData) => set({ shareModalData }),
  showShareModal(url) {
    set({ shareModalData: { visible: true, url } });
  },
}));
