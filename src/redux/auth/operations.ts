import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LogFormValues, RegFormValues } from "../../utils/formTypes";
import api from "../../api/axios";


export const setAuthHeader = (token: string): void => {
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
      return data;
    } catch (error: unknown) {
      return handleError(error, thunkApi.rejectWithValue);
    }
  }
);
//mrCam@gmail.com
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LogFormValues, thunkApi) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      setAuthHeader(data.accessToken);
      return data;
    } catch (error: unknown) {
      return handleError(error, thunkApi.rejectWithValue);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  
});

export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkApi) => {
  try {
    const { data } = await api.post("/auth/refresh");
      if(data) {
        setAuthHeader(data.accessToken)};
        return data;
  } catch (error: unknown) {
    return handleError(error,  thunkApi.rejectWithValue);
  }
});
