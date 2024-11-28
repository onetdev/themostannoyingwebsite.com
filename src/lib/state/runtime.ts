import { create } from 'zustand';

export interface RuntimeState {
  adblockerSuspected: boolean | null;
  document: {
    hasEverBeenVisible: boolean;
    isVisible: boolean;
    visibilitySeconds: number;
  };
  flaimSurveyResult: false | 'completed' | 'lost' | 'cheatDetected';
  interactionUnlocked: boolean;
  navigationCount: number;
  reducedMotion: boolean;
  startedAt?: string;
}

export interface RuntimeStateActions {
  incrementNavigationCount: () => void;
  incrementVisibilitySeconds: () => void;
  markInteractionUnlocked: () => void;
  setAdblockerSuspected: (adblockerSuspected: boolean | null) => void;
  setFlaimSurveyResult: (
    flaimSurveyResult: RuntimeState['flaimSurveyResult'],
  ) => void;
  setIsDocumentVisibile: (isVisible: boolean) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
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
}));
