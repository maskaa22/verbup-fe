import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice"
import dictReducer from "./dict/slice"

export const store = configureStore({
    reducer: {
    auth: authReducer,
    dict: dictReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

