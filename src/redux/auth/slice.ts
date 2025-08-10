import { createSlice } from "@reduxjs/toolkit";
import { login, refreshUser, register } from "./operations";

interface authState {
  user: {
      name: string | null,
      email: string | null,
    },
    token: string | null,
    isLoggedIn: boolean,
    isLoading: boolean,
    isRefreshing: boolean,
    isError: boolean,
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
  } 


const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload)
        state.token = action.payload.accessToken
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        state.isLoggedIn = true;
      })
    },

})

export default authSlice.reducer;