import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://carelink.onrender.com/hospital";

export const hospitalApiSlice = createApi({
  reducerPath: "Hospital",
  tagTypes: ["Hospital"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    createHospital: builder.mutation({
      query: (hospital) => ({
        url: "/postHospital",
        method: "POST",
        body: hospital,
      }),
      invalidatesTags: ["Hospital"],
    }),
    getHospitals: builder.query({
      query: () => "/getAllHospitals",
      providesTags: ["Hospital"],
    }),
    getHospital: builder.query({
      query: (id) => `/getHospital/${id}`,
      providesTags: ["Hospital"],
    }),

    deleteHospital: builder.mutation({
      query: (id) => ({
        url: `/deleteHospital/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hospital"],
    }),
    updateHospital: builder.mutation({
      query: ({ hospital, id }) => ({
        url: `/editHospital/${id}`,
        method: "PATCH",
        body: hospital,
      }),
      invalidatesTags: ["Hospital"],
    }),
  }),
});

export const {
  useCreateHospitalMutation,
  useUpdateHospitalMutation,
  useGetHospitalQuery,
  useGetHospitalsQuery,
  useDeleteHospitalMutation,
} = hospitalApiSlice;
