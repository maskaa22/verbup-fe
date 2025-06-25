import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectletterFilter = (state: RootState) => state.dict.letter;
export const selectallWordsStore = (state: RootState) => state.dict.allWords;
//memo-filter m-7 - less-2 - 30min-45min
export const visibleWordsStore = createSelector([selectletterFilter, selectallWordsStore], (letterFilter, allWordsStore) => {
    const filteredWords = allWordsStore;
    if(letterFilter !== ""){
return filteredWords?.easy.filter(word => word.base_form[0] === letterFilter)
}

return allWordsStore?.easy;
})