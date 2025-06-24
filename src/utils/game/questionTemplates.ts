import type { QuestionTemplates } from "../gameType";

export const questionTemplates: QuestionTemplates = {
  v2: [
    (verb) => `Which is the Past Simple (V2) of “${verb.base_form}”?`,
    (verb) => `Choose the correct past form of “${verb.base_form}”.`,
    (verb) => `What is the V2 form of “${verb.base_form}”?`,
    () => `Select the simple past form:`,
    (verb) => `Find the correct V2: “${verb.base_form}”`,
    (verb) => `${verb.base_form} → ... → ${verb.past_participle}`,
    (verb) => `The Past Simple of  “${verb.base_form}” is`,
    (verb) => `Match the verb “${verb.base_form}” with it's Past Simple form`,
    (verb) => `Change “${verb.base_form}” to it's Past Simple form`,
    (verb) => `Identify the Past Simple form of “${verb.base_form}”`,
  ],
  v3: [
    (verb) => `Which is the Past Participle (V3) of “${verb.base_form}”?`,
    (verb) => `Choose the third form of “${verb.base_form}”.`,
    (verb) => `${verb.base_form} → ${verb.past_participle} → ...`,
    (verb) => `What is the V3 form of “${verb.base_form}”?`,
    () => `Select the participle past form:`,
    (verb) => `Find the correct V3: “${verb.base_form}”`,
    (verb) => `The Past Participle of  “${verb.base_form}” is`,
    (verb) =>
      `Match the verb “${verb.base_form}” with it's Past Participle form`,
    (verb) => `Change “${verb.base_form}” to it's Past Participle form`,
    (verb) => `Identify the Past Participle form of “${verb.base_form}”`,
  ],
};
