import { createSlice } from "@reduxjs/toolkit";
import { sendProgress } from "./operations";

const progressSlice = createSlice({
  name: "progress",
  initialState: {
    data: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendProgress.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(sendProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // зберігаємо відповідь з бекенду
      })
      .addCase(sendProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default progressSlice.reducer;