import { create } from 'zustand';

export interface RuntimeState {
  document: {
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
