import { createSlice } from "@reduxjs/toolkit";
import { login, refreshUser, register } from "./operations";
import { initialStateAuth } from "../../constants";

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.accessToken;
        // state.token = action.payload.token;
        // state.user.name = action.payload.username;
        // state.user.email = action.payload.useremail
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.accessToken;
        state.user.name = action.payload.user.username;
        state.user.email = action.payload.user.email
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(refreshUser.fulfilled, (state) => {
        state.isLoading = false;
        // state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
