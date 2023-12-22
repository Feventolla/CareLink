import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://carelink.onrender.com/" }),

  // Adjust the base URL accordingly
  endpoints: (builder) => ({
    signup: builder.mutation({
      // query: (formData) => {
      //   console.log("hererrrrr");
      //   console.log(formData);
      //   // const body = new FormData();
      //   // Object.entries(formData).forEach(([key, value]) => {
      //   //   body.append(key, value);
      //   //   console.log("body", body);
      //   // });

      //   return {
      // url: "/patient/signup",
      //     method: "POST",
      //     body: formData,
      //   };
      // },
      query: (credentials) => ({
        url: "/patient/signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignupMutation } = userApi;
