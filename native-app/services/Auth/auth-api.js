import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
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
  }),
});

export const { useSignupMutation } = userApi;
