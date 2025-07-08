import { createSlice } from "@reduxjs/toolkit";
import type { NotificationState } from "../../utils/notify/notifyTypes";



const initialState: NotificationState = {
  notifications: {
    dailyTraining: false,
    achievsAndLevels: false,
    specialOffers: false,
    motivateMe: false,
    sound: false,
  },
  darkTheme: "light",
};
const notifySlice = createSlice({
  name: "notify",
  initialState: initialState,
  reducers: {
    setAllNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setTheme: (state, action) => {
      state.darkTheme = action.payload;
    }
  },
});

export const { setAllNotifications, setTheme } = notifySlice.actions;

export default notifySlice.reducer;
