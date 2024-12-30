import baseApi from "@/redux/api/baseApi";

// Follow-related endpoints
export const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({



    // Unfollow functionality
    unFollow: builder.mutation({
      query: (followingId: string) => ({
        url: `/follow/${followingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Following"],
    }),
  }),
  overrideExisting: false, // ensure it is not overriding
});

export const {
  useUnFollowMutation,
} = followApi;
