import type { Question, Verb } from "../gameType";
// import { questionTemplates } from "./questionTemplates";

const generateFakeVariant = (word: string): string => {
  const variations = [
    word + "ed",
    word.slice(0, -1) + "t",
    word + word[word.length - 1],
    word + "ing",
  ];
  return variations[Math.floor(Math.random() * variations.length)];
};

export const generateQuestion = (
  verb: Verb,
  mode: "v2" | "v3" = "v2"
): Question => {
  //   const templates = questionTemplates[mode] || [];
  //   const templateFn = templates[Math.floor(Math.random() * templates.length)];
  // console.log(templateFn);

  //   const question = templateFn
  //     ? templateFn(verb)
  //     // : `What is the ${mode} of "${verb.base_form}"?`;
  //     : verb.base_form;
  
  const question = verb.base_form;

  const correctAnswer = mode === "v2" ? verb.past_simple : verb.past_participle;

  const rawForms = [
    verb.base_form,
    verb.past_simple,
    verb.past_participle,
    verb.fake,
  ];

  const uniqueForms = new Set<string>();
  const variants = rawForms.map((form) => {
    let modified = form;
    while (uniqueForms.has(modified)) {
      modified = generateFakeVariant(modified);
    }
    uniqueForms.add(modified);
    return { name: modified };
  });

  return {
    question,
    correctAnswer,
    variants: variants.sort(() => Math.random() - 0.5),
    base_form: verb.base_form,
  };
};
