import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./features/chatSlice";

const store = configureStore({
  reducer: {
    chat: chatSlice,
  },
});

export default store;
