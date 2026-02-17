export interface NotificationState {
  notifications: {
    dailyTraining: boolean;
    achievsAndLevels: boolean;
    specialOffers: boolean;
    motivateMe: boolean;
    sound: boolean;
    vibration: boolean;
    voice: string,
  };
  darkTheme: string;
}

export interface Notifications {
  dailyTraining: boolean;
  achievsAndLevels: boolean;
  specialOffers: boolean;
  motivateMe: boolean;
  sound: boolean;
  vibration: boolean;
}
