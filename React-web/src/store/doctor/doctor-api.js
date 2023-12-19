import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://carelink.onrender.com/doctor";

export const doctorApiSlice = createApi({
  reducerPath: "Doctor",
  tagTypes: ["Doctor"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    createDoctor: builder.mutation({
      query: (Doctor) => ({
        url: "/postDoctor",
        method: "POST",
        body: Doctor,
      }),
      invalidatesTags: ["Doctor"],
    }),
    getDoctors: builder.query({
      query: () => "/getAllDoctors",
      providesTags: ["Doctor"],
    }),
    getDoctor: builder.query({
      query: (id) => `/getDoctor/${id}`,
      providesTags: ["Doctor"],
    }),

    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `/deleteDoctor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor"],
    }),
    updateDoctor: builder.mutation({
      query: ({ Doctor, id }) => ({
        url: `/editDoctor/${id}`,
        method: "PATCH",
        body: Doctor,
      }),
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useGetDoctorQuery,
  useGetDoctorsQuery,
  useDeleteDoctorMutation,
} = doctorApiSlice;
