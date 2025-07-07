import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { generateQuestions } from "./operations";

const initialState = {
  setting: {
    level: "",
    numQuest: "",
    verbForm: "",
  },
  items: [],
  current: 0,
};
const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    setSetting(state, action: PayloadAction<typeof initialState.setting>) {
      state.setting = action.payload;
    },
    baseQuestion(state) {
      state.items = [];
    },
    setCurrent(state, action: PayloadAction<number>) {
      state.current = action.payload;
    },
    resetCurrent(state) {
      state.current = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateQuestions.fulfilled, (state, action) => {
      state.items = action.payload;
    })
    .addCase(generateQuestions.pending, (state) => {
      state.items = []; // очищаємо попередні
    });
  },
});

export const { setSetting, baseQuestion, setCurrent, resetCurrent } = gameSlice.actions;
export default gameSlice.reducer;
