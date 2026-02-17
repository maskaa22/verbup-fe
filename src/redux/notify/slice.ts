import { createSlice } from "@reduxjs/toolkit";
import { notifyInitialState } from "../../constants";

const notifySlice = createSlice({
  name: "notify",
  initialState: notifyInitialState,
  reducers: {
    setAllNotifications: (state, action) => {
      state.notifications = action.payload;
      localStorage.setItem("notifications", JSON.stringify(action.payload));
    },
    setTheme: (state, action) => {
      state.darkTheme = action.payload;
    },
    setVoice: (state, action) => {
      state.notifications.voice = action.payload;
      
      localStorage.setItem("notifications", JSON.stringify(state.notifications));
    },
  },
});

export const { setAllNotifications, setTheme, setVoice } = notifySlice.actions;
export default notifySlice.reducer;
