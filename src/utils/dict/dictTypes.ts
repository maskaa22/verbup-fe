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
}

export interface InitialState {
  allWords: myVerbs | null;
  word: string;
  letter: string;
}