import { create } from 'zustand';

export interface RuntimeState {
  document: {
    hasEverBeenVisible: boolean;
    isVisible: boolean;
    visibilitySeconds: number;
  };
  interactionUnlocked: boolean;
  startedAt?: string;
}

export interface RuntimeStateActions {
  setIsDocumentVisibile: (isVisible: boolean) => void;
  markInteractionUnlocked: () => void;
  incrementVisibilitySeconds: () => void;
}

export interface RuntimeStore extends RuntimeState, RuntimeStateActions {}

const initialState: RuntimeState = {
  document: {
    hasEverBeenVisible: false,
    isVisible: false,
    visibilitySeconds: 0,
  },
  startedAt: undefined,
  interactionUnlocked: false,
};

export const useRuntimeStore = create<RuntimeStore>((set) => ({
  ...initialState,
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
  markInteractionUnlocked: () => set({ interactionUnlocked: true }),
  incrementVisibilitySeconds: () =>
    set((state) => ({
      document: {
        ...state.document,
        visibilitySeconds: state.document.visibilitySeconds + 1,
      },
      startedAt: state.startedAt ?? new Date().toISOString(),
    })),
}));
