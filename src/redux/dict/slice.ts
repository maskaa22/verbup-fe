import { createSlice } from "@reduxjs/toolkit";
import { fetchWords, getWords } from "./operations";
import type { InitialState } from "../../utils/dict/dictTypes";

const initialState: InitialState = {
  allWords: null,
  word: "",
  letter: "",
  isLoading: false
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
    }).addCase(getWords.pending, (state) => {
state.isLoading = true;
    }).addCase(getWords.fulfilled, (state) => {
state.isLoading = false;
    }).addCase(getWords.rejected, (state) => {
state.isLoading = false;
    });
  },
});

export const { setLetter, setWord } = dictSlice.actions;
export default dictSlice.reducer;
