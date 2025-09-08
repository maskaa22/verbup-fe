import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, refreshUser, register } from "./operations";

interface authState {
  user: {
    name: string | null;
    email: string | null;
  };
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  isError: boolean;
}

const initialState: authState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user.name = action.payload.username;
        state.user.email = action.payload.useremail
        state.isLoggedIn = true;
        console.log(action.payload)
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      }).addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        console.log("rejected", action.payload)
      })
      .addMatcher(
        isAnyOf(register.pending, login.pending, refreshUser.pending),
        (state) => {
          state.isLoading = true;
        }
      ).addMatcher(
        isAnyOf(register.rejected, login.rejected),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export default authSlice.reducer;
