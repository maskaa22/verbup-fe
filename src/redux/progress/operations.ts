import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getProgress = createAsyncThunk("data/progress", async () => {
  const res = await api.get("/progress")
  console.log(res.data)
})