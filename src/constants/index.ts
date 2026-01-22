import type { InitialState } from "../utils/dict/dictTypes";
import type { authState } from "../utils/formTypes";
import { loadSettingFromStorage } from "../utils/game/loadSettingFromStorage";
import type { GameState, MotivationItem } from "../utils/gameType";
import type { NotificationState } from "../utils/notify/notifyTypes";

export const SUCCESS = "success";
export const ERROR = "error";

export const PENDING = "pending";

export const BEGGINER = "Beginer";
export const INTERMEDIATE = "Intermediate";
export const ADVANCED = "Advanced";

export const CORRECT = "correct";
export const WRONG = "wrong";
export const LAST_INDEX = "lastAnsweredIndex";
export const ANSWER_STATUS = "answerStatuses";

export const GAME_SETTING = "gameSetting";
export const CURRENT_GAME = "currentGame";

export const MOTIVATION_SHOW = "motivation_shown";

export const PS = "ps";
export const PP = "pp";
export const SIMPLE = "Past Simple";
export const PARTICIPLE = "Past Participle";

export const VIBRATION = "vibration";

export const motivationData: MotivationItem[] = [
  {
    message: "Ти вже пройшов(-ла) більше, ніж половину — не зупиняйся!",
    image: "/image/motivation/astronavt-1.png",
  },
  {
    message: "Останній ривок — і ти побачиш результат своєї роботи!",
    image: "/image/motivation/astronavt-2.png",
  },
  {
    message: "Кожен запуск - це крок до зірок! Продовжуй тренування!",
    image: "/image/motivation/astronavt-3.png",
  },
  {
    message: "Ти вже на орбіті знань! Не зупиняйся!",
    image: "/image/motivation/astronavt-4.png",
  },
  {
    message: "Ти вже в серці місії - попереду тільки зорі!",
    image: "/image/motivation/astronavt-5.png",
  },
  {
    message: "Ще трохи і ти підкориш галактику неправильних дієслів!",
    image: "/image/motivation/astronavt-6.png",
  },
  {
    message: "Середина шляху - саме час увімкнути турборежим!",
    image: "/image/motivation/astronavt-7.png",
  },
];


export const verbFrom = ["(V2, V3)", "(V2)", "(V3)"];

export const initialStateGame: GameState = {
  setting: loadSettingFromStorage(),
  items: [],
  current: 0,
  correct: 0,
  wrong: 0,
};

export const notifyInitialState: NotificationState = {
  notifications: {
    dailyTraining: false,
    achievsAndLevels: false,
    specialOffers: false,
    motivateMe: false,
    sound: false,
    vibration: localStorage.getItem(VIBRATION) !== "false",
  },
  darkTheme: "light",
};

export const curves = [
  { id: "icon-line-1", offsetX: 310, offsetY: -740 },
  { id: "icon-line-2", offsetX: 0, offsetY: -670 },
  { id: "icon-line-3", offsetX: 100, offsetY: -650 },
  { id: "icon-line-4", offsetX: 200, offsetY: -620 },
  { id: "icon-line-5", offsetX: 250, offsetY: -560 },
  { id: "icon-line-6", offsetX: 0, offsetY: -500 },
  { id: "icon-line-7", offsetX: 320, offsetY: -500 },
  { id: "icon-line-8", offsetX: -15, offsetY: -300 },
  { id: "icon-line-9", offsetX: 330, offsetY: -400 },
  { id: "icon-line-10", offsetX: 150, offsetY: -350 },
  { id: "icon-line-11", offsetX: 50, offsetY: -400 },
  { id: "icon-line-12", offsetX: 250, offsetY: -310 },
];

export const initialStateAuth: authState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
  isError: null,
};

export const dictInitState: InitialState = {
  allWords: null,
  word: "",
  letter: "",
  learnt: false,
  isLoading: false,
};
