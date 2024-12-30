import baseApi from "@/redux/api/baseApi";

// Profile Visitor-related endpoints
export const profileVisitorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
  
      // Get profile visitor
      getProfileVisitor: builder.query({
        query: () => ({
          url: `/profile-visitors/my-visitors`,
          method: "GET",
        }),
        providesTags: ["GetProfileVisitor"],
      }),
    }),
  });
  
  export const {
    useCreateProfileVisitorMutation,
    useGetProfileVisitorQuery,
  } = profileVisitorApi;
  