import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { PARTICIPLE, PP, PS, SIMPLE, SUCCESS } from "../../constants";
import type { Question, SendProgressArgs } from "../../utils/gameType";
import {
  type getProgressResponce,
  type progressWord,
} from "../../utils/formTypes";
import axios from "axios";

export const sendProgress = createAsyncThunk<
  progressWord[],
  SendProgressArgs,
  { rejectValue: { status: number; message: string } }
>(
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

      return data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({
          status: error.response.status,
          message:
            error.response.data.message || "Progress could not be posted",
        });
      }
      return rejectWithValue({
        status: 0,
        message: "Progress could not be posted",
      });
    }
  },
);

export const getProgress = createAsyncThunk<
  getProgressResponce,
  void,
  { rejectValue: { status: number; message: string } }
>("progress/getProgress", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/progress");
    return res.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message || "Progress could not be fetched",
      });
    }
    return rejectWithValue({
      status: 0,
      message: "Progress could not be fetched",
    });
  }
});
