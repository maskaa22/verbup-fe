import type { RootState } from "../store";

export const selectAllNotifications = (state: RootState) => state.notify.notifications
// export const selectDailyTraining = (state: RootState) => state.notify.dailyTraining;
// export const selectAchievsAndLevels = (state: RootState) => state.notify.achievsAndLevels;
// export const selectSpecialOffers = (state: RootState) => state.notify.specialOffers;
// export const selectMotivateMe = (state: RootState) => state.notify.motivateMe;
// export const selectSound = (state: RootState) => state.notify.sound;
export const selectDarkTheme = (state: RootState) => state.notify.darkTheme;

