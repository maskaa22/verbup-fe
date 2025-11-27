import type { RootState } from "../store";

export const selectIsLoading = (state: RootState) => state.progress.loading;
export const selectIsError = (state: RootState) => state.progress.error;
export const selectppProgress = (state: RootState) => state.progress.ppProgress;
export const selectpsProgress = (state: RootState) => state.progress.psProgress;