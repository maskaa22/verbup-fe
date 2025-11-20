import { createSlice } from "@reduxjs/toolkit";
import { fetchWords } from "./operations";
import { dictInitState } from "../../constants";


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
    setLearnt(state){
      state.learnt = !state.learnt;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWords.fulfilled, (state, action) => {
      state.allWords = action.payload;
    })
  },
});

export const { setLetter, setWord, setLearnt } = dictSlice.actions;
export default dictSlice.reducer;
