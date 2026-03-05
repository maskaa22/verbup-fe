import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ADVANCED, BEGGINER, FAVORITE, INTERMEDIATE, LEARNED, NOT_STUDIED } from "../../constants";
import { loadSettingFromStorage } from "../../utils/game/loadSettingFromStorage";

export const selectletterFilter = (state: RootState) => state.dict.letter;
export const selectallWordsStore = (state: RootState) => state.dict.allWords;
export const selectwordFilter = (state: RootState) => state.dict.word;
export const selectLearntVerbs = (state: RootState) => state.dict.learnt;
export const selectPsProgress = (state: RootState) => state.progress.psProgress;
export const selectPpProgress = (state: RootState) => state.progress.ppProgress;
export const selectSort = (state: RootState) => state.dict.sort;
export const selectFavorites = (state: RootState) => state.dict.favoriteWords;

//memo-filter m-7 - less-2 - 30min-45min
export const visibleWordsStore = createSelector(
  [
    selectletterFilter,
    selectallWordsStore,
    selectwordFilter,
    selectPsProgress,
    selectPpProgress,
    selectSort,
    selectFavorites,
  ],
  (
    letterFilter,
    allWordsStore,
    wordFilter,
    psProgress,
    ppProgress,
    sort,
    favorites,
  ) => {
    const setting = loadSettingFromStorage();

    type Level = "easy" | "medium" | "hard";

    const levelMap: Record<string, Level> = {
      [BEGGINER]: "easy",
      [INTERMEDIATE]: "medium",
      [ADVANCED]: "hard",
    };

    const level: Level = levelMap[setting.level] ?? "easy";

    const filteredWords = level && allWordsStore ? allWordsStore[level] : [];

    if (wordFilter !== "") {
      return filteredWords?.filter(
        (word) =>
          word.basic.startsWith(wordFilter.toLowerCase()) ||
          word.pastSimple.startsWith(wordFilter.toLocaleLowerCase()) ||
          word.pastParticiple.startsWith(wordFilter.toLocaleLowerCase()),
      );
    }
    if (letterFilter !== "") {
      return filteredWords?.filter((word) => word.basic[0] === letterFilter);
    }
    if (sort === LEARNED) {
      return filteredWords?.filter(
        (word) =>
          psProgress.some((ps) => ps.word?.basic === word.basic) ||
          ppProgress.some((pp) => pp.word?.basic === word.basic),
      );
    }
    if (sort === NOT_STUDIED) {
      return filteredWords?.filter(
        (word) =>
          !psProgress.some((ps) => ps.word?.basic === word.basic) &&
          !ppProgress.some((pp) => pp.word?.basic === word.basic),
      );
    }
    if (sort === FAVORITE) {
      return filteredWords.filter((word) => favorites.includes(word.basic));
    }

    return filteredWords;
  },
);
