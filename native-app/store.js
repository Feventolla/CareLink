import { configureStore } from "@reduxjs/toolkit";
import { hospitalApi } from "./services/Hospital/hospital-api";
import { doctorApi } from "./services/Doctors/doctor-api";
import { userApi } from "./services/Auth/auth-api";
import authSlice from "./services/Auth/auth_slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [hospitalApi.reducerPath]: hospitalApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      hospitalApi.middleware,
      doctorApi.middleware,
      userApi.middleware
    ),
});
