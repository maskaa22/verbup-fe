import React, { createContext, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllNotifications } from "../redux/notify/selectors";
import { setAllNotifications } from "../redux/notify/slice";
import { VIBRATION } from "../constants";

type VibrationContextType = {
  vibrationEnabled: boolean;
  toggleVibration: () => void;
};

const VibrationContext = createContext<VibrationContextType | undefined>(
  undefined
);

export const VibrationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const vibrationEnabled = notifications.vibration;

  // 🔁 синхронізація з localStorage
  useEffect(() => {
    localStorage.setItem(VIBRATION, String(vibrationEnabled));
  }, [vibrationEnabled]);

  const toggleVibration = () => {
    dispatch(
      setAllNotifications({
        ...notifications,
        vibration: !vibrationEnabled,
      })
    );
  };

  return (
    <VibrationContext.Provider value={{ vibrationEnabled, toggleVibration }}>
      {children}
    </VibrationContext.Provider>
  );
};

export const useVibrationSettings = () => {
  const context = useContext(VibrationContext);
  if (!context) {
    throw new Error(
      "useVibrationSettings must be used within a VibrationProvider"
    );
  }
  return context;
};
