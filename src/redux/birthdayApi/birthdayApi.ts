import { baseApi } from "@/redux/api/baseApi";
import { use } from "react";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFollow: builder.mutation({
      query: (followingId: string) => ({
        url: "/follow",
        method: "POST",
        body: { followingId },
      }),
      invalidatesTags: ["Follow"],
    }),
    getTodaysBirthdays: builder.query({
      query: () => "/birthday/todays-birthdays",
      providesTags: ["Birthday"],
    }),

    // post birthday wish
    postBirthdayWish: builder.mutation({
      query: (data) => {
        return {
          url: "/birthday",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Birthday"],
    }),

    // get new members
    getNewmember: builder.query({
      query: () => "/users/new-members",
      providesTags: ["Newmember"],
    }),

    // fetch following
    fetchFollowing: builder.query({
      query: () => ({
        url: "/follow/following",
        method: "GET",
      }),
      providesTags: ["Follow"],
    }),

    // create profile visitor
    createProfileVisitor: builder.mutation({
      query: ({
        userId,
        followingId,
      }: {
        userId: string;
        followingId: string;
      }) => ({
        url: `/profile-visitors/${userId}`,
        method: "POST",
        body: { followingId },
      }),
      invalidatesTags: ["ProfileVisitor"],
    }),

    // get profile visitor
    getProfileVisitor: builder.query({
      query: () => ({ 
        url: `/profile-visitors/my-visitors`, 
        method: "GET" 
      }),
      providesTags: ["GetProfileVisitor"],
    }),

    // unfollow funtionality
    unFollow: builder.mutation({
      query: (followingId: string) => ({
        url: `/follow/${followingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UnFollow"],
    }),
  }),
});

export const {
  useAddFollowMutation,
  useGetTodaysBirthdaysQuery,
  usePostBirthdayWishMutation,
  useGetNewmemberQuery,
  useFetchFollowingQuery,
  useCreateProfileVisitorMutation,
  useGetProfileVisitorQuery,
  useUnFollowMutation,
} = authApi;
