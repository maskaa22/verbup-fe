import { createSlice } from "@reduxjs/toolkit";
import { fetchWords } from "./operations";

interface Verb {
    base_form: string,
      past_simple: string,
      past_participle: string,
      uk: string,
      fake: string
}

interface myVerbs {
    easy: Verb[],
    medium: Verb[],
    hard: Verb[]
}

interface InitialState {
    allWords: myVerbs | null;
    word: string,
    letter: string,
}
const initialState: InitialState = {
    allWords: null,
    word: "",
    letter: "",
}
const dictSlice = createSlice({
    name: "dict",
    initialState: initialState,
    reducers: {
        setLetter(state, action) {
            console.log("dispatch works");
            state.letter = action.payload 
            console.log(state.letter)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWords.fulfilled, (state, action) => {
            console.log("dispatch works all words fetch")
            state.allWords = action.payload
            console.log(state.allWords)
        })
    }

})

export const { setLetter } = dictSlice.actions;
export default dictSlice.reducer;