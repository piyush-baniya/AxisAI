import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UserPrompt: "",
  chatHistory: [], // Each item: { role: 'user' | 'model', content: string }
  isLoading: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUserPrompt: (state, action) => {
      state.UserPrompt = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addChatHistory: (state, action) => {
      state.chatHistory.push(action.payload);
    },
  },
});

export const { setUserPrompt, setIsLoading, addChatHistory } =
  chatSlice.actions;
export default chatSlice.reducer;
