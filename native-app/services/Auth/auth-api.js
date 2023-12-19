import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userapi = createApi({
  reducerPath: "userapi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://carelink.onrender.com/" }), // Adjust the base URL accordingly
  // endpoints: (builder) => ({
  //   loginUser: builder.query({
  //     query: (body: Login) => {
  //       return { url: "/Auth/login", method: "POST", body };
  //   }}),

  // }),
});

export const { useGetUserQuery } = userapi;
