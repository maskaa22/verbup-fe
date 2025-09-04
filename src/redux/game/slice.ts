import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { generateQuestions } from "./operations";
import { GAME_SETTING, initialStateGame } from "../../constants";

const gameSlice = createSlice({
  name: "game",
  initialState: initialStateGame,
  reducers: {
    setSetting(state, action: PayloadAction<typeof initialStateGame.setting>) {
      state.setting = action.payload;
      sessionStorage.setItem(GAME_SETTING, JSON.stringify(action.payload));
    },
    baseQuestion(state) {
      state.items = [];
    },
    setCurrent(state, action: PayloadAction<number>) {
      state.current = action.payload;
    },
    setCorrect(state, action: PayloadAction<number>) {
      state.correct = action.payload;
    },
    setWrong(state, action: PayloadAction<number>) {
      state.wrong = action.payload;
    },
    resetCurrent(state) {
      state.current = 0;
      state.correct = 0;
      state.wrong = 0;
    },
    hydrateFromStorage(
      state,
      action: PayloadAction<{ current: number; correct: number; wrong: number }>
    ) {
      state.current = action.payload.current;
      state.correct = action.payload.correct;
      state.wrong = action.payload.wrong;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateQuestions.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(generateQuestions.pending, (state) => {
        state.items = [];
      });
  },
});

export const {
  setSetting,
  baseQuestion,
  setCurrent,
  resetCurrent,
  setCorrect,
  setWrong,
  hydrateFromStorage
} = gameSlice.actions;
export default gameSlice.reducer;
