import type { RootState } from "../store";

export const selectIsLoggedIn = (state: RootState) => state.progress.loading;
export const selectIsError = (state: RootState) => state.progress.error;
export const selectProgress = (state: RootState) => state.progress.data;