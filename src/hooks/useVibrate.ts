import { VIBRATION } from "../constants";

export const useVibrate = (enabled: boolean = true) => {
  return (pattern: number | number[] = 200) => {
    if (enabled && VIBRATION in navigator) {
      navigator.vibrate(pattern);
    }
  };
};
