import { createAsyncThunk } from "@reduxjs/toolkit";

import { ADVANCED, BEGGINER, INTERMEDIATE } from "../../constants";
import type { RootState } from "../store";
import { generateQuestionsList } from "../../utils/game/generateQuestionsList";
import type { qestionDataOperation, Question, questionsLogin } from "../../utils/gameType";
import api from "../../api/axios";

export const getAuthHeader = (): string | undefined => {
  const auth = api.defaults.headers.common.Authorization;
  return auth != null ? String(auth) : undefined;
};

export const generateQuestions = createAsyncThunk<
  Question[],
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>("game/generateQuestions", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const { level, numQuest, verbForm } = state.game.setting;

    const count = Number(numQuest.split(" ")[0]);

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
  } catch (error: unknown) {
    const err = error as Error;
    return rejectWithValue(err.message);
  }
});

// export const getWords = createAsyncThunk<
//   Question[],
//   void,
//   {
//     state: RootState;
//     rejectValue: string;
//   }
// >("games/words", async (_, { rejectWithValue }) => {
//   try {
//     const token = getAuthHeader();
//     // console.log(token);
//     const { data } = await api.get("/games/words", {
//       headers: token ? { Authorization: token } : undefined,
//       params: {
//         level: "easy",
//         count: "5",
//         lang: "en",
//         irrWordType: "ps",
//       },
//     });
//     console.log(data.data.words);

//     return data.data.words;
//   } catch (error: unknown) {
//     const err = error as Error;
//     return rejectWithValue(err.message);
//   }
// });

export const getWords = createAsyncThunk("games/words", async (setting:questionsLogin, { rejectWithValue }) => {
  try {
    let token = "";
    const raw = localStorage.getItem("persist:user");
    if (raw) {
      const parsed = JSON.parse(raw);

      let newToken = parsed.token;

      if (typeof newToken === "string") {
        newToken = newToken.replace(/^"|"$/g, "");
      }

      token = newToken;
    }

    const {level, numQuest, verbForm} = setting;

   
    const count = Number(numQuest.split(" ")[0]);

    const { data } = await api.get("/games/words", {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      params: {
        level: (level === 'Beginer' && "easy") || (level === 'Intermediate' && 'medium') || (level === 'Advanced' && 'hard'),
        count,
        lang: "en",
        irrWordType: (verbForm === 'Past Simple' && "ps") || (verbForm === 'Past Participle' && 'pp') || (verbForm === 'Змішаний' && 'mixed'),
      },
    });

    // console.log(data.data.words);
    

    return data.data.words;
  } catch (error: unknown) {
    const err = error as Error;
    return rejectWithValue(err.message);
  }
});
