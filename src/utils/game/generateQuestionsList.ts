import { generateQuestion } from "./generateQuestion";

type Verb = {
  base_form: string;
  past_simple: string;
  past_participle: string;
  fake: string;
};

export const generateQuestionsList = (
  verbsArray: Verb[],
  count: number,
  mode: "v2" | "v3" = "v2"
) => {
  const shuffled = [...verbsArray].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  return selected.map((verb) => generateQuestion(verb, mode));
};
