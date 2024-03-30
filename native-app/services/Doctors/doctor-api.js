import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://carelink.onrender.com/" }),
  endpoints: (builder) => ({
    doctor: builder.query({
      query: (id) => `/doctor/getDoctor/${id}`,
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

export const { useDoctorQuery } = doctorApi;
