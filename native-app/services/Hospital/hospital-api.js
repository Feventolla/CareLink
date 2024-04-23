import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hospitalApi = createApi({
  reducerPath: "hospitalApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://carelink.onrender.com/" }),
  endpoints: (builder) => ({
    getHospitals: builder.query({
      query: () => "/hospital/getAllHospitals",
    }),
    hospital: builder.query({
      query: (id) => `/hospital/getHospital/${id}`,
    }),
    getNearbyHospitals: builder.query({
      query: (location) => ({
        url: "/hospital/getNearbyHospitals",
        body: location,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetHospitalsQuery,
  useHospitalQuery,
  useGetNearbyHospitalsQuery,
} = hospitalApi;
