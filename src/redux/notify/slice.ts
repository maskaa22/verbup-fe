import { createSlice } from "@reduxjs/toolkit";
import { notifyInitialState } from "../../constants";




const notifySlice = createSlice({
  name: "notify",
  initialState: notifyInitialState,
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
