import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prompt: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
  },
});

export const { setPrompt } = chatSlice.actions;
export default chatSlice.reducer;
