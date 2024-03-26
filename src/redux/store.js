import { configureStore } from "@reduxjs/toolkit";
import carsSlice from "./slices/carsSlice";

export const store = configureStore({
  reducer: {
    cars: carsSlice,
  },
});
