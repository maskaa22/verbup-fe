import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectletterFilter = (state: RootState) => state.dict.letter;
export const selectallWordsStore = (state: RootState) => state.dict.allWords;
export const selectwordFilter = (state: RootState) => state.dict.word;
export const selectLearntVerbs = (state: RootState) => state.dict.learnt;
export const selectPsProgress = (state: RootState) => state.progress.psProgress;
export const selectPpProgress = (state: RootState) => state.progress.ppProgress;

//memo-filter m-7 - less-2 - 30min-45min
export const visibleWordsStore = createSelector(
  [
    selectletterFilter,
    selectallWordsStore,
    selectwordFilter,
    selectLearntVerbs,
    selectPsProgress,
    selectPpProgress,
  ],
  (
    letterFilter,
    allWordsStore,
    wordFilter,
    showLearnt,
    psProgress,
    ppProgress
  ) => {
    const filteredWords = allWordsStore?.easy;
    if (wordFilter !== "") {
      return filteredWords?.filter(
        (word) =>
          word.basic.startsWith(wordFilter.toLowerCase()) ||
          word.pastSimple.startsWith(wordFilter.toLocaleLowerCase()) ||
          word.pastParticiple.startsWith(wordFilter.toLocaleLowerCase())
      );
    }
    if (letterFilter !== "") {
      return filteredWords?.filter((word) => word.basic[0] === letterFilter);
    }
    if (showLearnt) {
      return filteredWords?.filter(
        (word) =>
          psProgress.some((ps) => ps.word?.basic === word.basic) ||
          ppProgress.some((pp) => pp.word?.basic === word.basic)
      );
    }

    return allWordsStore?.easy;
  }
);
