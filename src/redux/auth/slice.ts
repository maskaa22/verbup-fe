import { createSlice } from "@reduxjs/toolkit";

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
    // extraReducers: {},

})

export default authSlice.reducer;