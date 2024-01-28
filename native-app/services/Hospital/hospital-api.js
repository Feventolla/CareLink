import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hospitalApi = createApi({
  reducerPath: "hospitalApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://carelink.onrender.com/" }),
  endpoints: (builder) => ({
    getHospitals: builder.query({
      query: () => "/hospital/getAllHospitals",
    }),
    Hospital: builder.query({
      query: (id) => `/hospital/getHospital/${id}`,
    }),
  }),
});
// const api = createApi({
//   // other configurations...
//   onQueryUpdated: (query) => {
//     console.log("Query Updated:", query);
//   },
//   // other configurations...
// });

export const { useGetHospitalsQuery, useHospitalQuery } = hospitalApi;
