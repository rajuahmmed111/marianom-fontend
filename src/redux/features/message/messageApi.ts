import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const socketapi = "http://192.168.11.172:3018/api/v1/messages";

export const authApi = createApi({
    reducerPath: 'authApi', // Required to specify the slice name
    baseQuery: fetchBaseQuery({ baseUrl: socketapi }), // Set the base URL for your API
    endpoints: (builder) => ({
        getMessage: builder.query({
            query: () => ({
                url: '/channels', // Corrected URL path to get messages
                method: 'GET',
            }),
            providesTags: ['message'],
        }),
    }),
});

export const {
    useGetMessageQuery,
} = authApi;
