import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, refreshUser, register } from "./operations";
import { initialStateAuth } from "../../constants";





const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.accessToken;
        // state.token = action.payload.token;
        // state.user.name = action.payload.username;
        // state.user.email = action.payload.useremail
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.token = action.payload.accessToken;
        // state.token = action.payload.token;
        // state.user.name = action.payload.username;
        // state.user.email = action.payload.useremail
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.fulfilled, (state) => {
        state.isLoading = false;
        // state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      }).addCase(refreshUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addMatcher(
        isAnyOf(register.pending, login.pending, refreshUser.pending),
        (state) => {
          state.isLoading = true;
        }
      ).addMatcher(
        isAnyOf(register.rejected, login.rejected),
        (state) => {
          // console.log("action.payload:", action.payload.status)
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export default authSlice.reducer;
