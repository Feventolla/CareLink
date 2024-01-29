import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["Patient"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://carelink.onrender.com/" }),

  // Adjust the base URL accordingly
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/patient/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/patient/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    getPatient: builder.query({
      query: (patientId) => `/patient/getPatient/${patientId}`,
      providesTags: ["Patient"]

    }),

    forgot: builder.mutation({
      query: (credentials) => ({
        url: "/patient/forgetPassword",
        method: "POST",
        body: credentials,
      }),
    }),
    reset: builder.mutation({
      query: (credentials) => ({
        url: "/patient/resetPassword",
        method: "POST",
        body: credentials,
      }),

    }),

 
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useForgotMutation,
  useResetMutation,
  useGetPatientQuery

  
} = userApi;
