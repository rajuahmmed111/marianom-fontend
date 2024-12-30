import baseApi from "@/redux/api/baseApi";
// import { authApi } from "../authSlice/authApi";

// Follow-related endpoints
export const followApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      addFollow: builder.mutation({
        query: (followingId: string) => ({
          url: "/follow",
          method: "POST",
          body: { followingId },
        }),
        invalidatesTags: ["Follow"],
      }),
  
      // Fetch following
      fetchFollowing: builder.query({
        query: () => ({
          url: "/follow/following",
          method: "GET",
        }),
        providesTags: ["Follow"],
      }),
  
      // Unfollow functionality
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
    useFetchFollowingQuery,
    useUnFollowMutation,
  } = followApi;
  
  