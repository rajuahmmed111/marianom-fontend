/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import Cookies from 'js-cookie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error('Environment variable NEXT_PUBLIC_BASE_URL is not set');
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3018/api/v1',
    prepareHeaders: (headers) => {
      const token = Cookies.get('accessToken'); // Assuming token is stored in the auth slice
      // const token = localStorage?.auth.token;
      console.log('token', token);
      if (token) {
        headers.set('Authorization', `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});

export default baseApi;
