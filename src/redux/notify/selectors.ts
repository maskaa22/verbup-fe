import type { RootState } from "../store";

export const selectAllNotifications = (state: RootState) => state.notify.notifications
export const selectDarkTheme = (state: RootState) => state.notify.darkTheme;

