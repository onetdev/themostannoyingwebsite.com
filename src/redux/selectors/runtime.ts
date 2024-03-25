import type { AppRootState } from '@/redux/store';

const selectRuntime = (state: AppRootState) => state.runtime;

export const selectInteractionUnlocked = (state: AppRootState) =>
  state.runtime.interactionUnlocked;
export const selectIsDocumentVisible = (state: AppRootState) =>
  state.runtime.document.isVisible;
export const selectStartedAt = (state: AppRootState) =>
  new Date(state.runtime.startedAt);
export const selectVisibilitySeconds = (state: AppRootState) =>
  state.runtime.document.visibilitySeconds;

export default selectRuntime;
