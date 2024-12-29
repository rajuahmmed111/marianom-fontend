'use client';
import Cookies from 'js-cookie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../rootReducer';


const baseUrl = "http://192.168.11.253:3018/api/v1";

if (!baseUrl) {
  throw new Error('Environment variable NEXT_PUBLIC_BASE_URL is not set');
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.11.253:3018/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const authToken = state.auth.token; // Token from Redux store

      const searchParams = new URLSearchParams(window.location.search);
      const tokenFromURL = searchParams.get("token"); // Token from URL query params

      // Prioritize token from URL over Redux store
      const finalToken = tokenFromURL || authToken;

      if (finalToken) {
        headers.set("Authorization", `${finalToken}`); // Add token to the Authorization header
      }
      return headers;
    },
  }),
  tagTypes: ["User","Follow", "Birthday", "Newmember"],
  endpoints: (builder) => ({}),
});

export default baseApi;

