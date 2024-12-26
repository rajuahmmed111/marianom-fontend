/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log(baseUrl);

if (!baseUrl) {
  throw new Error('Environment variable NEXT_PUBLIC_BASE_URL is not set');
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage?.auth.token;
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
