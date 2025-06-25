import type { RootState } from "../store";

export const letterFilter = (state: RootState) => state.dict.letter;
export const allWordsStore = (state: RootState) => state.dict.allWords;