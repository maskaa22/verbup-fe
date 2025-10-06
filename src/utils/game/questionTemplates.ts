import type { QuestionTemplates } from "../gameType";

export const questionTemplates: QuestionTemplates = {
  v2: [
    (verb) => `Which is the Past Simple (V2) of “${verb.basic}”?`,
    (verb) => `Choose the correct past form of “${verb.basic}”.`,
    (verb) => `What is the V2 form of “${verb.basic}”?`,
    () => `Select the simple past form:`,
    (verb) => `Find the correct V2: “${verb.basic}”`,
    (verb) => `${verb.basic} → ... → ${verb.pastParticiple}`,
    (verb) => `The Past Simple of  “${verb.basic}” is`,
    (verb) => `Match the verb “${verb.basic}” with it's Past Simple`,
    (verb) => `Change “${verb.basic}” to it's Past Simple form`,
    (verb) => `Identify the Past Simple form of “${verb.basic}”`,
  ],
  v3: [
    (verb) => `Which is the Past Participle (V3) of “${verb.basic}”?`,
    (verb) => `Choose the third form of “${verb.basic}”.`,
    (verb) => `${verb.basic} → ${verb.pastParticiple} → ...`,
    (verb) => `What is the V3 form of “${verb.basic}”?`,
    () => `Select the participle past form:`,
    (verb) => `Find the correct V3: “${verb.basic}”`,
    (verb) => `The Past Participle of  “${verb.basic}” is`,
    (verb) =>
      `Match the verb “${verb.basic}” with it's Past Participle form`,
    (verb) => `Change “${verb.basic}” to it's Past Participle form`,
    (verb) => `Identify the Past Participle form of “${verb.basic}”`,
  ],
};
