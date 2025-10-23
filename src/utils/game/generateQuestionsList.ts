import type { Verb } from "../gameType";
import { generateQuestion } from "./generateQuestion";

export const generateQuestionsList = (
  verbsArray: Verb[],
  count: number,
  mode: "v2" | "v3" | "Змішаний" = "v2"
) => {

  const shuffled = [...verbsArray].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  return selected.map((verb) => generateQuestion(verb, mode));
};
