import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  setting: {
    level: "",
    numQuest: "",
    verbForm: "",
  },
};
const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    setSetting(state, action) {    
      state.setting = action.payload;
    },
  },
});

export const { setSetting } = gameSlice.actions;
export default gameSlice.reducer;
