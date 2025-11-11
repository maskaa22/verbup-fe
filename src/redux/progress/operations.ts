import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { PARTICIPLE, PP, PS, SIMPLE, SUCCESS } from "../../constants";
import type {
  Question,
  SendProgressArgs,
} from "../../utils/gameType";
import {type getProgressResponce, type progressWord } from "../../utils/formTypes";

export const sendProgress = createAsyncThunk<progressWord[], SendProgressArgs>(
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

      // console.log("Готові дані:", words);
      console.log("data in post progress", data.data)
      return data.data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Error sending progress");
    }
  }
);


export const getProgress = createAsyncThunk("progress/getProgress", async (_, thunkApi) => {
try {
    const res = await api.get<getProgressResponce>('/progress');
    console.log("get.progress res", res.data)
    return res.data.data
} catch (error) {
  return thunkApi.rejectWithValue(error || "Progress could not be fetched")
}
})


