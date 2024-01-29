import { configureStore } from "@reduxjs/toolkit";
import { doctorApiSlice } from "./doctor/doctor-api";
import { hospitalApiSlice } from "./hospital/hospital-api";
import { authApiSlice } from "./auth/auth-api";
import authSlice from "./auth/auth-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [doctorApiSlice.reducerPath]: doctorApiSlice.reducer,
    [hospitalApiSlice.reducerPath]: hospitalApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      doctorApiSlice.middleware,
      hospitalApiSlice.middleware,
      authApiSlice.middleware
    );
  },
});
