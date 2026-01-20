import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  type LogFormValues,
  type loginResponce,
  type RegFormValues,
} from "../../utils/formTypes";
import { api } from "../../api/axios";
import axios from "axios";

export const setAuthHeader = (token: string): void => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk<
  { message: string },
  RegFormValues,
  { rejectValue: { status: number; message: string } }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/register", credentials);
    setAuthHeader(data.accessToken);

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue({
        status: error.response.status ?? 0,
        message: error.response.data.message || "something went wrong",
      });
    }
    throw error;
  }
});

export const verify = createAsyncThunk("auth/verify", async (token: string) => {
  const res = await api.get(`/auth/verify-email?token=${token}`);
  return res;
});

export const login = createAsyncThunk<
  loginResponce,
  LogFormValues,
  { rejectValue: { status: number; message: string } }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/login", credentials);

    setAuthHeader(data.accessToken);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue({
        status: error.response.status ?? 0,
        message: error.response.data.message || "something went wrong",
      });
    }
    throw error;
  }
});

export const logout = createAsyncThunk<
  null,
  void,
  { rejectValue: { status: number; message: string } }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await api.post("/auth/logout");
    api.defaults.headers.common.Authorization = "";
    return null;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue({
        status: error.response.status ?? 0,
        message: error.response.data.message || "something went wrong",
      });
    }
    throw error;
  }
});

export const resetAll = createAction("app/resetAll");

export const refreshUser = createAsyncThunk<
  null,
  void,
  { rejectValue: { status: number; message: string } }
>("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/refresh");
    setAuthHeader(data.accessToken);
    return null;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue({
        status: error.response.status ?? 0,
        message: error.response.data.message || "something went wrong",
      });
    }
    return null;
  }
});
