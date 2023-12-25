import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://carelink.onrender.com/" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),

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
  }),
});

export const { useSignupMutation, useLoginMutation } = userApi;
