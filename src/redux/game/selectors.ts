import type { RootState } from "../store";

export const selectGameSetting = (state: RootState) => state.game.setting;
export const selectQueries = (state: RootState) => state.game.items;
export const selectCurrent = (state: RootState) => state.game.current;
export const selectCorrect = (state: RootState) => state.game.correct;
export const selectWrong = (state: RootState) => state.game.wrong;