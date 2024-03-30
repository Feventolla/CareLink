import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../utils/cookie";

const BASE_URL = "https://carelink.onrender.com/doctor";

export const doctorApiSlice = createApi({
  reducerPath: "Doctor",
  tagTypes: ["Doctor"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getCookie("token");
      if (token) {
        headers.set("authorization", `bearer ${token}`);
      }
      return headers;
    },
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
      query: ({ doctor, id }) => ({
        url: `/editDoctor/${id}`,
        method: "PATCH",
        body: doctor,
      }),
      invalidatesTags: ["Doctor"],
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
