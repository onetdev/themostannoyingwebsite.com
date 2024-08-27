import { create } from 'zustand';

export interface RuntimeState {
  document: {
    isVisible: boolean;
    visibilitySeconds: number;
  };
  interactionUnlocked: boolean;
  startedAt: string;
}

export interface RuntimeStateActions {
  setIsDocumentVisibile: (isVisible: boolean) => void;
  markInteractionUnlocked: () => void;
  incrementVisibilitySeconds: () => void;
}

const initialState: RuntimeState = {
  document: {
    isVisible: false,
    visibilitySeconds: 0,
  },
  startedAt: new Date().toISOString(),
  interactionUnlocked: false,
};

export const useRuntimeStore = create<RuntimeState & RuntimeStateActions>(
  (set) => ({
    ...initialState,
    setIsDocumentVisibile: (isVisible) =>
      set((state) => ({
        document: {
          ...state.document,
          isVisible,
        },
      })),
    markInteractionUnlocked: () => set({ interactionUnlocked: true }),
    incrementVisibilitySeconds: () =>
      set((state) => ({
        document: {
          ...state.document,
          visibilitySeconds: state.document.visibilitySeconds + 1,
        },
      })),
  }),
);
