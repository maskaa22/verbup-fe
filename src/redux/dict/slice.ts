import { createSlice } from "@reduxjs/toolkit";
import { fetchWords } from "./operations";
import { dictInitState, FAVORITE_WORDS } from "../../constants";

const dictSlice = createSlice({
  name: "dict",
  initialState: dictInitState,
  reducers: {
    setWord(state, action) {
      state.word = action.payload;
    },
    setLetter(state, action) {
      state.letter = action.payload;
    },
    setLearnt(state) {
      state.learnt = !state.learnt;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    toggleFavorite(state, action) {
      const word = action.payload;

      if (state.favoriteWords.includes(word)) {
        state.favoriteWords = state.favoriteWords.filter((w) => w !== word);
      } else {
        state.favoriteWords.push(word);
      }

      localStorage.setItem(FAVORITE_WORDS, JSON.stringify(state.favoriteWords));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWords.fulfilled, (state, action) => {
      state.allWords = action.payload;
    });
  },
});

export const { setLetter, setWord, setLearnt, setSort, toggleFavorite } =
  dictSlice.actions;
export default dictSlice.reducer;
