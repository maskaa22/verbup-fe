import { createSlice } from "@reduxjs/toolkit";
import { getProgress, sendProgress } from "./operations";
// import type { ProgressWord } from "../../utils/gameType";
import type { progressWord } from "../../utils/formTypes";
export interface ProgressState {
  psProgress: progressWord[];
  ppProgress: progressWord[];
  loading: boolean;
  error: boolean;
}

export const initialProgressState: ProgressState = {
  psProgress: [],
  ppProgress: [],
  loading: false,
  error: false,
};
const progressSlice = createSlice({
  name: "progress",
  initialState: initialProgressState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendProgress.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(sendProgress.fulfilled, (state, action) => {
        state.loading = false;
        const psNew = action.payload.filter((word) => word.type == "ps");
        const ppNew = action.payload.filter((word) => word.type === "pp");
        // console.log("ps", psNew)
        // console.log("pp", ppNew)
        if (psNew.length > 0)
          state.psProgress = [...state.psProgress, ...psNew];
        if (ppNew.length > 0)
          state.ppProgress = [...state.ppProgress, ...ppNew];
      })
      .addCase(sendProgress.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getProgress.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.psProgress = action.payload.progressPs;
        state.ppProgress = action.payload.progressPp;
      })
      .addCase(getProgress.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default progressSlice.reducer;
