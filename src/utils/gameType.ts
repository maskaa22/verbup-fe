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
  correctAnswer: string
};

export type allGameType = {
  current: number;
  setCheckAnswerType: string;
  setShowCheckAnswer: boolean;
  setModalActive: boolean;
  questions: Array;
};

export type checkAnswerType = {
  type: string;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};
