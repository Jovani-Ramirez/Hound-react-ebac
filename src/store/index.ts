import { configureStore } from "@reduxjs/toolkit";
import guiasReducer from "../store/guiasSlice";

export const store = configureStore({
  reducer: {
    guias: guiasReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
