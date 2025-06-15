import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RegFormValues } from "../../components/RegisterForm/RegisterForm";
import type { LogFormValues } from "../../components/signinFrom/SigninForm";

export const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});
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
      setAuthHeader(data.token);
      return data;
    } catch (error: unknown) {
      return handleError(error, thunkApi.rejectWithValue);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LogFormValues, thunkApi) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error: unknown) {
      return handleError(error, thunkApi.rejectWithValue);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  
});

export const refreshUser = createAsyncThunk("auth/refreshUser", async () => {});
