import { createSlice } from "@reduxjs/toolkit";
import { fetchWords } from "./operations";
import type { InitialState } from "../../utils/dict/dictTypes";

const initialState: InitialState = {
  allWords: null,
  word: "",
  letter: "",
};
const dictSlice = createSlice({
  name: "dict",
  initialState: initialState,
  reducers: {
    setWord(state, action) {
      state.word = action.payload;
    },
    setLetter(state, action) {
      state.letter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWords.fulfilled, (state, action) => {
      state.allWords = action.payload;
    });
  },
});

export const { setLetter, setWord } = dictSlice.actions;
export default dictSlice.reducer;
