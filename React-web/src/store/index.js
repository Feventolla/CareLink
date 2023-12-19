import { configureStore } from "@reduxjs/toolkit";
import { doctorApiSlice } from "./doctor/doctor-api";
import { hospitalApiSlice } from "./hospital/hispital";
export const store = configureStore({
  reducer: {
    [doctorApiSlice.reducerPath]: doctorApiSlice.reducer,
    [hospitalApiSlice.reducerPath]: hospitalApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      doctorApiSlice.middleware,
      hospitalApiSlice.middleware
    );
  },
});
