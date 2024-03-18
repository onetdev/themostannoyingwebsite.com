import type { AppRootState } from '@/redux/store';

const selectRuntime = (state: AppRootState) => state.runtime;
export const selectStartTime = (state: AppRootState) =>
  new Date(state.runtime.startTime);
export const selectIsInFocus = (state: AppRootState) => state.runtime.isInFocus;
export const selectHasInteracted = (state: AppRootState) =>
  state.runtime.hasInteracted;
export const selectInFocusSeconds = (state: AppRootState) =>
  state.runtime.inFocusSeconds;

export default selectRuntime;
