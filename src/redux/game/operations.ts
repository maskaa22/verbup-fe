import { createAsyncThunk } from "@reduxjs/toolkit";

import { ADVANCED, BEGGINER, INTERMEDIATE } from "../../constants";
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

// export const generateQuestions = createAsyncThunk<
//   Question[],
//   void,
//   {
//     state: RootState;
//     rejectValue: string;
//   }
// >("game/generateQuestions", async (_, { getState, rejectWithValue }) => {
//   try {
//     const state = getState() as RootState;
//     const { level, numQuest, verbForm } = state.game.setting;

//     const count = Number(numQuest.split(" ")[0]);

//     const res = await fetch("/data/irr-verbs.filtered.json");
//     const data: qestionDataOperation = await res.json();

//     const mode = verbForm === "Past Simple" ? "v2" : "v3";

//     let questions: Question[] = [];
//     if (count > 0) {
//       if (level === BEGGINER) {
//         questions = generateQuestionsList(data.easy, count, mode);
//       } else if (level === INTERMEDIATE) {
//         questions = generateQuestionsList(data.medium, count, mode);
//       } else if (level === ADVANCED) {
//         questions = generateQuestionsList(data.hard, count, mode);
//       }
//     }

//     return questions;
//   } catch (error: unknown) {
//     const err = error as Error;
//     return rejectWithValue(err.message);
//   }
// });

// // export const getWords = createAsyncThunk<
// //   Question[],
// //   void,
// //   {
// //     state: RootState;
// //     rejectValue: string;
// //   }
// // >("games/words", async (_, { rejectWithValue }) => {
// //   try {
// //     const token = getAuthHeader();
// //     // console.log(token);
// //     const { data } = await api.get("/games/words", {
// //       headers: token ? { Authorization: token } : undefined,
// //       params: {
// //         level: "easy",
// //         count: "5",
// //         lang: "en",
// //         irrWordType: "ps",
// //       },
// //     });
// //     console.log(data.data.words);

// //     return data.data.words;
// //   } catch (error: unknown) {
// //     const err = error as Error;
// //     return rejectWithValue(err.message);
// //   }
// // });

// interface QuestionSettings {
//   level: string;
//   numQuest: string;
//   verbForm: string;
//   gameType: "test" | "input";
// }

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

// export const generateQuestions = createAsyncThunk<
//   Question[],
//   QuestionSettings,
//   { state: RootState; rejectValue: string }
// >("games/words", async (_, { getState, rejectWithValue }) => {
//   try {

//     let token = "";
//     const raw = localStorage.getItem("persist:user");
//     if (raw) {
//       const parsed = JSON.parse(raw);
//       let newToken = parsed.token;
//       if (typeof newToken === "string") {
//         newToken = newToken.replace(/^"|"$/g, "");
//       }
//       token = newToken;
//     }
// console.log(111);
// const state = getState() as RootState;
//     const { level, numQuest, verbForm } = state.game.setting;
//     console.log(level);
//     const count = Number(numQuest.split(" ")[0]);

//     const gameType = 'test';
// console.log(gameType);

//     // 🔹 завантажуємо локальний файл для довідки (і переклади, і fake)
//     const res = await fetch("/data/irr-verbs.filtered.json");

//     const data: qestionDataOperation = await res.json();
//     console.log(data);
//     const allVerbs: Verb[] = [
//       ...data.easy,
//       ...data.medium,
//       ...data.hard,
//     ];

//     if (token) {
//       const { data: backend } = await api.get("/games/words", {
//         headers: { Authorization: `Bearer ${token}` },
//         params: {
//           level:
//             (level === "Beginer" && "easy") ||
//             (level === "Intermediate" && "medium") ||
//             (level === "Advanced" && "hard"),
//           count,
//           lang: "en",
//           irrWordType:
//             (verbForm === "Past Simple" && "ps") ||
//             (verbForm === "Past Participle" && "pp") ||
//             (verbForm === "Змішаний" && "mixed"),
//         },
//       });

//       console.log(backend.data.word);

//       return backend.data.words.map((word: any) => {
//         // знайти слово в локальному файлі
//         const localVerb = allVerbs.find((v) => v.basic === word.basic);

//         const correctAnswer =
//           verbForm === "Past Simple"
//             ? localVerb?.pastSimple
//             : localVerb?.pastParticiple;

//         const q: Question = {
//           question: word.basic,
//           correctAnswer: correctAnswer || "",
//           basic: word.basic,
//           translate: localVerb?.uk,
//         };

//         if (gameType === "test" && localVerb) {
//           const rawForms = [
//             localVerb.basic,
//             localVerb.pastSimple,
//             localVerb.pastParticiple,
//             localVerb.fake,
//           ];
//           const unique = Array.from(new Set(rawForms));
//           q.variants = unique
//             .map((name) => ({ name }))
//             .sort(() => Math.random() - 0.5);
//         }

//         return q;
//       });
//     }

//     // 🔹 якщо немає токена → працюємо чисто з локальними словами
//     const mode =
//       verbForm === "Past Simple"
//         ? "v2"
//         : verbForm === "Past Participle"
//         ? "v3"
//         : "mixed";

//     // if (level === BEGGINER) {
//     //   return generateQuestionsList(data.easy, count, mode, gameType);
//     // } else if (level === INTERMEDIATE) {
//     //   return generateQuestionsList(data.medium, count, mode, gameType);
//     // } else if (level === ADVANCED) {
//     //   return generateQuestionsList(data.hard, count, mode, gameType);
//     // }
//      if (level === BEGGINER) {
//       return generateQuestionsList(data.easy, count, mode);
//     } else if (level === INTERMEDIATE) {
//       return generateQuestionsList(data.medium, count, mode);
//     } else if (level === ADVANCED) {
//       return generateQuestionsList(data.hard, count, mode);
//     }

//     return [];
//   } catch (error: unknown) {
//     const err = error as Error;
//     return rejectWithValue(err.message);
//   }
// });

export function getTokenFromStorage(): string | null {
  const raw = localStorage.getItem("persist:user");
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (parsed?.token && typeof parsed.token === "string") {
      return parsed.token.replace(/^"|"$/g, ""); // прибираємо лапки
    }
  } catch (e) {
    console.error("Помилка парсингу persist:user", e);
  }
  return null;
}

export const generateQuestions = createAsyncThunk<
  Question[],
  void,
  // questionsLogin,
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

    //

    const token = getTokenFromStorage();
    console.log("TOKEN:", token);

    // 🔹 якщо користувач НЕ залогінений → локальний режим
    if (!isLogin) {
      const res = await fetch("/data/irr-verbs.filtered.json");
      const data: qestionDataOperation = await res.json();

      const mode = verbForm === "Past Simple" ? "v2" : "v3";

      let questions: Question[] = [];
      if (count > 0) {
        if (level === BEGGINER) {
          questions = generateQuestionsList(data.easy, count, mode);
        } else if (level === INTERMEDIATE) {
          questions = generateQuestionsList(data.medium, count, mode);
        } else if (level === ADVANCED) {
          questions = generateQuestionsList(data.hard, count, mode);
        }
      }

      return questions;
    }

    // 🔹 якщо залогінений → дані з бекенду
    const { data } = await api.get("/games/words", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        level:
          (level === "Beginer" && "easy") ||
          (level === "Intermediate" && "medium") ||
          (level === "Advanced" && "hard"),
        count,
        lang: "en",
        irrWordType:
          (verbForm === "Past Simple" && "ps") ||
          (verbForm === "Past Participle" && "pp") ||
          (verbForm === "Змішаний" && "mixed"),
      },
    });

    const backendWords: { basic: string; correctAnswer: string; id: number }[] =
      data.data.words;

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

      const correctAnswer =
        verbForm === "Past Simple"
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
        correctAnswer: correctAnswer,
        variants: buildVariants(localVerb),
        basic: localVerb.basic,
        translate: localVerb.uk,
        id: word.id,
      };
    });

    return enriched;
  } catch (error: unknown) {
    const err = error as Error;
    return rejectWithValue(err.message);
  }
});
