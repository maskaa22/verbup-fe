import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { PARTICIPLE, PP, PS, SIMPLE, SUCCESS } from "../../constants";
import type {
  ProgressWord,
  Question,
  SendProgressArgs,
} from "../../utils/gameType";

export const sendProgress = createAsyncThunk<ProgressWord[], SendProgressArgs>(
  "progress/sendProgress",
  async ({ questions, gameSetting, answerStatuses }, { rejectWithValue }) => {
    try {
      const words = questions.map((q: Question, idx: number) => ({
        wordId: q.id,
        type:
          (gameSetting.verbForm === SIMPLE && PS) ||
          (gameSetting.verbForm === PARTICIPLE && PP) ||
          (gameSetting.verbForm === "Змішаний" && "mixed"),
        correct: answerStatuses[idx] === SUCCESS ? true : false,
      }));

      const { data } = await api.post("/progress", { words });

      console.log("Готові дані:", words);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Error sending progress");
    }
  }
);
