import { baseApi } from "@/redux/api/baseApi";

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
  }),
});

export const { useAddFollowMutation,
    useGetTodaysBirthdaysQuery,
    usePostBirthdayWishMutation,
    useGetNewmemberQuery,
    useFetchFollowingQuery} = authApi;
