import { BEGGINER, GAME_SETTING } from "../../constants";

export function loadSettingFromStorage() {
  try {
    const saved = sessionStorage.getItem(GAME_SETTING);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Помилка при читанні gameSetting з sessionStorage", e);
  }
  return {
    level: BEGGINER,
    numQuest: "5 питань",
    verbForm: "Past Simple",
  };
}