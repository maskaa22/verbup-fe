export interface Props {
  word: {
    basic: string;
    pastSimple: string;
    pastParticiple: string;
    uk: string;
  };
}

interface Verb {
  basic: string;
  pastSimple: string;
  pastParticiple: string;
  uk: string;
  fake: string;
}

interface myVerbs {
  easy: Verb[];
  medium: Verb[];
  hard: Verb[];
  setting?: { level: string };
}

export interface InitialState {
  allWords: myVerbs | null;
  word: string;
  letter: string;
  learnt: boolean;
  isLoading: boolean;
  sort: string;
  favoriteWords: string[];
}
