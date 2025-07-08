export type baseComponentType = {
  current: number;
  img: string;
  question: string;
  answerStatuses: AnswerStatus[];
  count: number;
};

export type AnswerStatus = "passed" | "error" | "pending";

export type baseButtonType = {
  word: string;
  setCheckAnswerType: React.Dispatch<React.SetStateAction<string>>;
  setShowCheckAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  correctAnswer: string;
  answerStatuses: AnswerStatus[];
  setAnswerStatuses: React.Dispatch<React.SetStateAction<AnswerStatus[]>>;
  current: number;
};

export type progressBarProps = {
  total: number;
  currentIndex: number; // індекс поточного питання (від 0 до total-1)
  answerStatuses: string[];
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
};
export type CardGameProps = {
  question: QuestionType;
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
};
export type Verb = {
  base_form: string;
  past_simple: string;
  past_participle: string;
  fake: string;
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
};

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
