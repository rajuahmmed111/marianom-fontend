// api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api", 
  baseQuery: fetchBaseQuery({
    baseUrl: "https://marianom-backend.vercel.app/api/v1", 
  }),
  tagTypes: ["User", "Posts", "Profile"],
  endpoints: () => ({}), 
});
