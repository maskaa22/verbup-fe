import type { Question, Verb } from "../gameType";

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
  mode: "v2" | "v3" | "Змішаний" = "v2"
): Question => {
  const question = verb.basic;

  const correctAnswer = mode === "v2" ? verb.pastSimple : verb.pastParticiple;

  const rawForms = [
    verb.basic,
    verb.pastSimple,
    verb.pastParticiple,
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
    basic: verb.basic,
    translate: verb.uk,
  };
};

export const generateQuestionForLogin = (
  verb: Verb,
  mode: "v2" | "v3" = "v2"
): Question => {
  const question = verb.basic;

  const correctAnswer = mode === "v2" ? verb.pastSimple : verb.pastParticiple;

  const rawForms = [
    verb.basic,
    verb.pastSimple,
    verb.pastParticiple,
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
    basic: verb.basic,
    translate: verb.uk,
  };
};
