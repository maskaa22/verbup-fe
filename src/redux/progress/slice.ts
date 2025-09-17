import { createSlice } from "@reduxjs/toolkit";
import { getProgress } from "./operations";

export interface ProgresInitState {
    progressPP: string[],
    progressPS: string[],
    isLoading: boolean
}
export const progressInitState: ProgresInitState = {
    progressPP: [],
    progressPS: [],
    isLoading: false 
}

const progressSlice = createSlice({
    name: "progress",
    initialState: progressInitState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProgress.pending, (state) => {
state.isLoading = true;
        }).addCase(getProgress.fulfilled, (state) => {
state.isLoading = false;
        })
    }
})

export default progressSlice.reducer;