import { createAsyncThunk } from "@reduxjs/toolkit";

import { ADVANCED, BEGGINER, INTERMEDIATE } from "../../constants";
import type { RootState } from "../store";
import { generateQuestionsList } from "../../utils/game/generateQuestionsList";
import type { qestionDataOperation, Question } from "../../utils/gameType";

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
    const { level, numQuest } = state.game.setting;
    
    const count = Number(numQuest.split(" ")[0]);

    const res = await fetch("/data/irr-verbs.filtered.json");
    const data: qestionDataOperation = await res.json();
    

    let questions: Question[] = [];
    if (count > 0) {
      if (level === BEGGINER) {
        questions = generateQuestionsList(data.easy, count);
      } else if (level === INTERMEDIATE) {
        questions = generateQuestionsList(data.medium, count);
      } else if (level === ADVANCED) {
        questions = generateQuestionsList(data.hard, count);
      }
    }

    return questions;
  } catch (error: unknown) {
    const err = error as Error;
    return rejectWithValue(err.message);
  }
});
