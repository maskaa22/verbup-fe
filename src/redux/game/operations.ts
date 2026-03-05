import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  ADVANCED,
  BEGGINER,
  INTERMEDIATE,
  PARTICIPLE,
  PP,
  PS,
  SIMPLE,
} from "../../constants";
import type { RootState } from "../store";
import { generateQuestionsList } from "../../utils/game/generateQuestionsList";
import type {
  qestionDataOperation,
  Question,
  Verb,
} from "../../utils/gameType";
import api from "../../api/axios";

export const getAuthHeader = (): string | undefined => {
  const auth = api.defaults.headers.common.Authorization;
  return auth != null ? String(auth) : undefined;
};

// 🔹 утиліта для генерації фейкових варіантів
const generateFakeVariant = (word: string): string => {
  const variations = [
    word + "ed",
    word.slice(0, -1) + "t",
    word + word[word.length - 1],
    word + "ing",
  ];
  return variations[Math.floor(Math.random() * variations.length)];
};

// 🔹 будуємо рівно 4 варіанти
function buildVariants(localVerb: Verb): { name: string }[] {
  const rawForms = [
    localVerb.basic,
    localVerb.pastSimple,
    localVerb.pastParticiple,
    localVerb.fake,
  ];

  const uniqueForms = new Set<string>(rawForms);

  // додаємо фейкові, поки не стане 4
  while (uniqueForms.size < 4) {
    const fake = generateFakeVariant(localVerb.basic);
    uniqueForms.add(fake);
  }

  return Array.from(uniqueForms)
    .map((form) => ({ name: form }))
    .sort(() => Math.random() - 0.5);
}

export const getPastType = (verbForm: string): typeof PS | typeof PP => {
  if (verbForm === SIMPLE) return PS;
  if (verbForm === PARTICIPLE) return PP;

  // 🔥 MIXED
  return Math.random() < 0.5 ? PS : PP;
};

export const generateQuestions = createAsyncThunk<
  Question[],
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>("game/getWords", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const { level, numQuest, verbForm } = state.game.setting;
    const isLogin = state.auth.isLoggedIn;
    const count = Number(numQuest.split(" ")[0]);

    // 🔹 якщо користувач НЕ залогінений → локальний режим
    if (!isLogin) {
      const res = await fetch("/data/irr-verbs.filtered.json");
      const data: qestionDataOperation = await res.json();

      const mode = verbForm === SIMPLE ? "v2" : PARTICIPLE ? "v3" : "Змішаний";

      let questions: Question[] = [];

      if (count > 0) {
        const source =
          level === BEGGINER
            ? data.easy
            : level === INTERMEDIATE
              ? data.medium
              : data.hard;

        const rawQuestions = generateQuestionsList(source, count, mode);

        // 🔥 ДОЗБАГАЧУЄМО typePast ДЛЯ MIXED
        questions = rawQuestions.map((q) => {
          const pastType = getPastType(verbForm);

          return {
            ...q,
            typePast: pastType,
            // correctAnswer: pastType === PS ? q.pastSimple : q.pastParticiple,
          };
        });
      }

      return questions;
    }

    const { data } = await api.get("/games/words", {
      params: {
        level:
          (level === BEGGINER && "easy") ||
          (level === INTERMEDIATE && "medium") ||
          (level === ADVANCED && "hard"),
        count,
        lang: "en",
        irrWordType:
          (verbForm === SIMPLE && PS) ||
          (verbForm === PARTICIPLE && PP) ||
          (verbForm === "Змішаний" && "mixed"),
      },
    });

    const backendWords: {
      basic: string;
      correctAnswer: string;
      id: number;
      type: string;
    }[] = data.data.words;

    // 🔹 локальний словник (для перекладів і форм)
    const resLocal = await fetch("/data/irr-verbs.filtered.json");
    const localData: qestionDataOperation = await resLocal.json();
    const allLocal = [
      ...localData.easy,
      ...localData.medium,
      ...localData.hard,
    ];

    // 🔹 збагачуємо бекенд-слова локальними даними
    const enriched: Question[] = backendWords.map((word) => {
      const localVerb = allLocal.find((lv) => lv.basic === word.basic);
      const pastType = getPastType(verbForm);

      const correctAnswer =
        pastType === PS
          ? localVerb?.pastSimple || word.correctAnswer
          : localVerb?.pastParticiple || word.correctAnswer;

      if (!localVerb) {
        // fallback якщо нема у локальному словнику
        return {
          question: word.basic,
          correctAnswer: correctAnswer,
          variants: [{ name: word.correctAnswer }],
          basic: word.basic,
          translate: "",
        };
      }

      return {
        question: word.basic,
        correctAnswer,
        variants: buildVariants(localVerb),
        basic: localVerb.basic,
        translate: localVerb.uk,
        id: word.id,
        typePast: pastType,
      };
    });

    return enriched;
  } catch (error: unknown) {
    const err = error as Error;
    return rejectWithValue(err.message);
  }
});
