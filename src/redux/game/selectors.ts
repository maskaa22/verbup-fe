import type { RootState } from "../store";

export const selectGameSetting = (state: RootState) => state.game.setting;
export const selectQueries = (state: RootState) => state.game.items;
export const selectCurrent = (state: RootState) => state.game.current;