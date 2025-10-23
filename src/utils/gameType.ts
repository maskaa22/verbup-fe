import type { PARTICIPLE, PP, PS, SIMPLE } from "../constants";

export type AnswerStatus = "success" | "error" | "pending";

export type baseComponentType = {
  current: number;
  img: string;
  question: string;
  answerStatuses: AnswerStatus[];
  count: number;
  translate: string;
  typePast: string
};

export type baseButtonType = {
  word: string;
  setCheckAnswerType: React.Dispatch<React.SetStateAction<string>>;
  setShowCheckAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  correctAnswer: string;
  answerStatuses: AnswerStatus[];
  setAnswerStatuses: React.Dispatch<React.SetStateAction<AnswerStatus[]>>;
  current: number;
  setIsChecked?: (value: boolean) => void;
  setVisibility: (value: boolean) => void;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  setVoice?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type progressBarProps = {
  total: number;
  currentIndex: number; // індекс поточного питання (від 0 до total-1)
  answerStatuses: string[];
};

export type modalType = {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};
export type cardGameType = {
  current: number;
  setCheckAnswerType: React.Dispatch<React.SetStateAction<string>>;
  setShowCheckAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};
export type BtnType = {
  name: string;
};
export type QuestionType = {
  question: string;
  correctAnswer: string;
  variants: BtnType[];
  basic: string;
  translate: string;
  id?: number;
  typePast: string
};
export type CardGameProps = {
  question: QuestionType;
  answerStatusesWrite?: AnswerStatus[];
  setShowMotivation: React.Dispatch<React.SetStateAction<boolean>>;
};

export type allGameType = {
  current: number;
  setCheckAnswerType: string;
  setShowCheckAnswer: boolean;
  setModalActive: boolean;
  questions: QuestionType[];
};

export type checkAnswerType = {
  type: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  questions?: Question[];
};

export type gameOptions = {
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
};

export type currentAnswerAndQuestions = {
  questions: QuestionType[];
  current: number;
};

export type Question = {
  question: string;
  correctAnswer: string;
  variants: BtnType[];
  basic: string;
  translate: string;
  id?: number;
};
export type Verb = {
  basic: string;
  pastSimple: string;
  pastParticiple: string;
  fake: string;
  uk: string;
};
export type TemplateFn = (verb: Verb) => string;
export type QuestionTemplates = {
  v2: TemplateFn[];
  v3: TemplateFn[];
};

export type qestionDataOperation = {
  easy: Verb[];
  medium: Verb[];
  hard: Verb[];
};

export type RadioGroupProps = {
  name: string;
  options: string[];
  onChange: (value: string) => void;
  selectedValue?: string;
  needSpan: boolean;
  disabled: boolean;
  disabledOption?: (option: string) => boolean;
};

export interface questionsLogin {
  level: string;
  numQuest: string;
  verbForm: string;
}

export interface GameState {
  setting: {
    level: string;
    numQuest: string;
    verbForm: string;
  };
  items: Question[];
  current: number;
  correct: number;
  wrong: number;
}
export interface GameSettingTypeProps {
  icon: string;
  text: string;
  title: string;
  path: string;
  count: number;
  gameType: string;
  disabled: boolean;
}

export type StarProps = {
  total?: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  rating: number;
};

export interface MotivationItem {
  message: string;
  image: string; // шлях до картинки
}
export interface ProgressWord {
  wordId: string | number;
  type: typeof PS | typeof PP | "Змішаний";
  correct: boolean;
}
export interface GameSetting {
  verbForm: typeof SIMPLE | typeof PARTICIPLE | "Змішаний" | string;
}
export interface SendProgressArgs {
  questions: Question[];
  gameSetting: GameSetting;
  answerStatuses: AnswerStatus[];
}