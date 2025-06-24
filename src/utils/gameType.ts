export type baseComponentType = {
  current: number;
  img: string;
  question: string;
};

export type baseButtonType = {
  word: string;
  setCheckAnswerType: React.Dispatch<React.SetStateAction<string>>;
  setShowCheckAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  correctAnswer: string;
};

export type cardGameType = {
  current: number;
  setCheckAnswerType: (type: string) => void;
  setShowCheckAnswer: (show: boolean) => void;
  setModalActive: (active: boolean) => void;
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
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
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
