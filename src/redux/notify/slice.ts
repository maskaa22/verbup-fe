import { createSlice } from "@reduxjs/toolkit";

interface NotificationState {
  notifications: {
    dailyTraining: boolean;
    achievsAndLevels: boolean;
    specialOffers: boolean;
    motivateMe: boolean;
    sound: boolean;
  };
  darkTheme: boolean;
}

const initialState: NotificationState = {
  notifications: {
    dailyTraining: false,
    achievsAndLevels: false,
    specialOffers: false,
    motivateMe: false,
    sound: false,
  },
  darkTheme: false,
};
const notifySlice = createSlice({
  name: "notify",
  initialState: initialState,
  reducers: {
    setAllNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { setAllNotifications } = notifySlice.actions;

export default notifySlice.reducer;
