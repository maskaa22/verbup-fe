import { createAsyncThunk } from "@reduxjs/toolkit";
import { type LogFormValues, type RegFormValues, type UserPayload } from "../../utils/formTypes";
import {api} from "../../api/axios";


export const setAuthHeader = (token: string): void => {
  // console.log("Bearer", token)
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const handleError = (
  error: unknown,
  rejectWithValue: (value: string) => unknown
) => {
  if (error instanceof Error) {
    return rejectWithValue(error.message);
  }
  return rejectWithValue("Something went wrong");
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegFormValues, thunkApi) => {
    try {
      const { data } = await api.post("/auth/register", credentials);
      console.log(data)
      setAuthHeader(data.accessToken);
      const user = await api.get("/users")
      const payload = {
        token: data.accessToken,
        username: user.data.username,
        useremail: user.data.email
      }
      return payload;
    } catch (error: unknown) {
      // return handleError(error, thunkApi.rejectWithValue);
      return thunkApi.rejectWithValue(error || "Registration failed")
    }
  }
);

export const login = createAsyncThunk<UserPayload, LogFormValues>(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
            // console.log(data)
      setAuthHeader(data.accessToken);
      const user = await api.get("/users")
      const payload = {
        token: data.accessToken,
        username: user.data.username,
        useremail: user.data.email
      }
      return payload;
    } catch (error: unknown) {
      // return handleError(error, thunkApi.rejectWithValue);
      return thunkApi.rejectWithValue(error || "Login failed")
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  
});

export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkApi) => {
  try {
    const { data } = await api.post("/auth/refresh");
    // console.log(data)
      if(data) {
        setAuthHeader(data.accessToken)};
        return data;
  } catch (error: unknown) {
    return handleError(error,  thunkApi.rejectWithValue);
  }
});
