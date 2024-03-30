import { getCookie } from "../../utils/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "auth/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://carelink.onrender.com/patient",
    prepareHeaders: (headers) => {
      const token = getCookie("token");
      if (token) {
        headers.set("authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints(builder) {
    return {
      loginUser: builder.mutation({
        query: (body) => {
          return { url: "/signin", method: "POST", body };
        },
      }),
    };
  },
});

export const { useLoginUserMutation } = authApiSlice;
