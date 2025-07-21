import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectletterFilter = (state: RootState) => state.dict.letter;
export const selectallWordsStore = (state: RootState) => state.dict.allWords;
export const selectwordFilter = (state: RootState) => state.dict.word;
//memo-filter m-7 - less-2 - 30min-45min
export const visibleWordsStore = createSelector([selectletterFilter, selectallWordsStore, selectwordFilter], (letterFilter, allWordsStore, wordFilter) => {
    const filteredWords = allWordsStore?.easy;
    if(wordFilter !== ""){
return filteredWords?.filter(word => word.base_form.includes(wordFilter.toLowerCase()) || word.past_simple.includes(wordFilter.toLocaleLowerCase()))
    }
    if(letterFilter !== ""){
return filteredWords?.filter(word => word.base_form[0] === letterFilter)
}

return allWordsStore?.easy;
})