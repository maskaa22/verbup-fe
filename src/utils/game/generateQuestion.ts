import type { Question, Verb } from "../gameType";
import { questionTemplates } from "./questionTemplates";

export const generateQuestion = (
  verb: Verb,
  mode: "v2" | "v3" = "v2"
): Question => {
  const templates = questionTemplates[mode] || [];
  const templateFn = templates[Math.floor(Math.random() * templates.length)];

  const question = templateFn
    ? templateFn(verb)
    : `What is the ${mode} of "${verb.base_form}"?`;

  const correctAnswer = mode === "v3" ? verb.past_participle : verb.past_simple;

  return {
    question,
    correctAnswer,
    variants: [
      { name: verb.base_form },
      { name: verb.past_simple },
      { name: verb.past_participle },
      { name: verb.fake },
    ],
  };
};
