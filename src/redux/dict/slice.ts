import { createSlice } from "@reduxjs/toolkit";
import { fetchWords } from "./operations";

interface Verb {
  base_form: string;
  past_simple: string;
  past_participle: string;
  uk: string;
  fake: string;
}

interface myVerbs {
  easy: Verb[];
  medium: Verb[];
  hard: Verb[];
}

interface InitialState {
  allWords: myVerbs | null;
  word: string;
  letter: string;
}
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

export const { setLetter } = dictSlice.actions;
export default dictSlice.reducer;
