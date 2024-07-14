import { rootReducer } from "./reducers/root-reducer";
import { configureStore } from "@reduxjs/toolkit";

export const initStore = configureStore({
  reducer: {
    rootReducer,
  },
});
