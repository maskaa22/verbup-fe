import { createSlice } from "@reduxjs/toolkit";
import { getProgress, sendProgress } from "./operations";
// import type { ProgressWord } from "../../utils/gameType";
import type { progressWord } from "../../utils/formTypes";
import { resetAll } from "../auth/operations";
export interface ProgressState {
  psProgress: progressWord[];
  ppProgress: progressWord[];
  loading: boolean;
  error: {status: number; message: string} | null;
}

export const initialProgressState: ProgressState = {
  psProgress: [],
  ppProgress: [],
  loading: false,
  error: null,
};
const progressSlice = createSlice({
  name: "progress",
  initialState: initialProgressState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendProgress.fulfilled, (state) => {
        state.loading = false;
        // const psNew = action.payload.filter((word) => word.type === "ps" && word.status !== "mistake");
        // const ppNew = action.payload.filter((word) => word.type === "pp" && word.status !== "mistake");
        // console.log("ps", psNew)
        // console.log("pp", ppNew)
        // if (psNew.length > 0)
        //   state.psProgress = [...state.psProgress, ...psNew];
        // if (ppNew.length > 0)
        //   state.ppProgress = [...state.ppProgress, ...ppNew];
      })
      .addCase(sendProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      .addCase(getProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.psProgress = action.payload.progressPs;
        state.ppProgress = action.payload.progressPp;
      })
      .addCase(getProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      }).addCase(resetAll, () => initialProgressState);
  },
});

export default progressSlice.reducer;
