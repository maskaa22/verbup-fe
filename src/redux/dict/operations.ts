import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWords = createAsyncThunk("data/fetchWords", async () => {
try {
      const res = await fetch("/data/irr-verbs.filtered.json");
  return await res.json();
} catch (error) {
    console.log(error)
}
});


