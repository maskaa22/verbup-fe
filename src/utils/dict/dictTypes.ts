export interface Props {
  word: {
    base_form: string;
    past_simple: string;
    past_participle: string;
    uk: string;
  };
}

interface Verb {
  base_form: string;
  past_simple: string;
  past_participle: string;
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
  isLoading: boolean
}