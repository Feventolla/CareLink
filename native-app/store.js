import { configureStore } from "@reduxjs/toolkit";
import { hospitalApi } from "./services/Hospital/hospital-api";
import { doctorApi } from "./services/Doctors/doctor-api";

export const store = configureStore({
  reducer: {
    [hospitalApi.reducerPath]: hospitalApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hospitalApi.middleware, doctorApi.middleware),
});
