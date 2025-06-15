import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./operations";

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

//username: 'Mich', email: 'mrMitch@gmail.com', password: 'mrMitch@gmail.com'

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        state.isLoggedIn = true;
      }).addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        state.isLoggedIn = true;
      })
    },

})

export default authSlice.reducer;