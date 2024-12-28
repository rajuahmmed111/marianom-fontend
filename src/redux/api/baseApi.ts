/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../rootReducer";

const baseUrl = "http://192.168.11.253:3018/api/v1";

if (!baseUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.11.253:3018/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const authToken = state.auth.token;

      if (authToken) {
        headers.set("Authorization", `${authToken}`);
      }
      return headers;
    },
  }),

  tagTypes: ["User", "Follow", "Birthday"],

  endpoints: (builder) => ({
    addFollow: builder.mutation({
      query: (followData: { followerId: string; followingId: string }) => ({
        url: "/follow",
        method: "POST",
        body: followData,
      }),
      invalidatesTags: ["Follow"],
    }),

    getTodaysBirthdays: builder.query({
      query: () => "/birthday/todays-birthdays",
      providesTags: ["Birthday"],
    }),

    postBirthdayWish: builder.mutation({
      query: (wishData: { userName: string; wishMessage: string; image?: File }) => {
        const formData = new FormData();
        formData.append("userName", wishData.userName);
        formData.append("wishMessage", wishData.wishMessage);
        if (wishData.image) {
          formData.append("image", wishData.image);
        }

        return {
          url: "/birthday",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Birthday"],
    }),
  }),
});

export const {
  useAddFollowMutation,
  useGetTodaysBirthdaysQuery,
  usePostBirthdayWishMutation,
} = baseApi;
