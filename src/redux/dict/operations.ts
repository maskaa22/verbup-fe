import { createAsyncThunk } from "@reduxjs/toolkit";
// import { api } from "../../api/axios";

export const fetchWords = createAsyncThunk("data/fetchWords", async () => {
try {
      const res = await fetch("/data/irr-verbs.filtered.json");
    // const res = await api.get("/irr-words/en/list")
    // console.log(res)
  return await res.json();
} catch (error) {
    console.log(error)
}
});