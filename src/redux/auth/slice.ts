import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser, register, resetAll } from "./operations";
import { initialStateAuth } from "../../constants";

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {
    setErrorNull(state){
      state.isError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = action.payload || null
        console.log("register", action.error)

      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.accessToken;
        state.user.name = action.payload.user.username;
        state.user.email = action.payload.user.email
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = action.payload || null
        console.log("login", action)

      }).addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      }).addCase(logout.fulfilled, (state) => {
        state.isLoading = false
      }).addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || null
        console.log("logout", action.error)

      })
      .addCase(resetAll, () => initialStateAuth)
      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(refreshUser.fulfilled, (state) => {
        state.isLoading = false;
        // state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        console.log("refresh", action.error)
        state.isError = action.payload || null

      });
  },
});

export default authSlice.reducer;
export const {setErrorNull} = authSlice.actions;