import type { RootState } from "../store";

export const selectGameSetting = (state: RootState) => state.game.setting;