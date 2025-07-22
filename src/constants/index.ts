import type { GameState } from "../utils/gameType";
import type { NotificationState } from "../utils/notify/notifyTypes";

export const SUCCESS = "success";
export const ERROR = "error";

export const BEGGINER = "Begginer";
export const INTERMEDIATE = "Intermediate";
export const ADVANCED = "Advanced";

export const arrOfNamesSignup = [
  {
    label: "Ім'я",
    name: "username",
    type: "text",
    placeholder: "Введіть ваше ім'я",
    icon: "icon-user",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "your@email.com",
    icon: "icon-email",
  },
  {
    label: "Пароль",
    name: "password",
    type: "password",
    placeholder: "Мінімум 8 символів",
    icon: "icon-password",
  },
];

export const arrOfNamesSignin = [
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "your@email.com",
    icon: "icon-email",
  },
  {
    label: "Пароль",
    name: "password",
    type: "password",
    placeholder: "Мінімум 8 символів",
    icon: "icon-password",
  },
];
export const arrOfNamesPassword = [
  {
    label: "Поточний пароль",
    name: "current",
    type: "password",
    placeholder: "Мінімум 8 символів",
    icon: "icon-password",
  },
  {
    label: "Новий пароль",
    name: "new",
    type: "password",
    placeholder: "Мінімум 8 символів",
    icon: "icon-password",
  },
  {
    label: "Підтвердити новий пароль",
    name: "repeat",
    type: "password",
    placeholder: "Мінімум 8 символів",
    icon: "icon-password",
  },
];

export const arrOfNamesUser = [
  {
    label: "Поточне ім’я",
    name: "current",
    type: "text",
    placeholder: "Введіть ваше ім'я",
    icon: "icon-user",
  },
  {
    label: "Нове ім’я",
    name: "new",
    type: "text",
    placeholder: "Введіть ваше ім'я",
    icon: "icon-user",
  },
];

export const verbFrom = ["(V2)", "(V3)", "(V2, V3)"];

export const initialStateGame: GameState = {
  setting: {
    level: BEGGINER,
    numQuest: "5 питань",
    verbForm: "",
  },
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
